import "@/assets/globals.css";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { graphql } from "gql.tada";
import { request } from "graphql-request";
import { NonUndefined } from "react-hook-form";
import { Button } from "./components/ui/button";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Sample />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const query = graphql(`
  query Tasks {
    tasks {
      id
      title
      assignee {
        id
        email
        fullName
      }
      createdBy {
        id
        email
        fullName
      }
    }
  }
`);

const createTaskMutation = graphql(`
  mutation createTask($input: CreateTaskInput) {
    createTask(input: $input) {
      id
      createdAt
      updatedAt
      title
      description
      status
    }
  }
`);

type MutationApiType = NonUndefined<(typeof createTaskMutation)["__apiType"]>;
type MutationInput = Parameters<MutationApiType>[0];

const useCreateTask = () => {
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (variables: MutationInput) =>
      request("http://localhost:5000/graphql", createTaskMutation, variables),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });
};

function Sample() {
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => request("http://localhost:5000/graphql", query),
  });

  const { mutate } = useCreateTask();

  function handleMutate() {
    mutate({
      input: {
        title: "New task",
        description: "New task description",
        status: "DONE",
      },
    });
  }

  return (
    <>
      <h1 className="bg-red-300 p-10">Hello world</h1>
      <Button onClick={handleMutate}>addd</Button>
      <ul>
        {data?.tasks?.map((task) => (
          <li key={task?.id}>
            {task?.title}--{task?.id}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
