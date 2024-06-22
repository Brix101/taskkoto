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
import { cn } from "./lib/utils";

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
      description
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
      title
      description
      status
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

type MutationApiType = NonUndefined<(typeof createTaskMutation)["__apiType"]>;
type MutationInput = Parameters<MutationApiType>[0];

const TASK_KEY = ["tasks"];

const useCreateTask = () => {
  return useMutation({
    mutationKey: ["createTask"],
    onMutate: async (variables: MutationInput) => {
      queryClient.cancelQueries({ queryKey: TASK_KEY });
      const previousValue = queryClient.getQueryData(["tasks"]);
      queryClient.setQueryData(TASK_KEY, (old: any) => {
        return {
          tasks: [
            ...old.tasks,
            {
              id: "temp-id",
              title: variables.input?.title,
              description: variables.input?.description,
              status: variables.input?.status,
            },
          ],
        };
      });
      return { previousValue };
    },
    mutationFn: async (variables: MutationInput) =>
      request("http://localhost:5000/graphql", createTaskMutation, variables),
    onSuccess: (data) => {
      queryClient.setQueryData(TASK_KEY, (old: any) => {
        return {
          tasks: [
            ...old.tasks.filter((task: any) => task.id !== "temp-id"),
            data.createTask,
          ],
        };
      });
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(TASK_KEY, context?.previousValue);
    },
  });
};

function Sample() {
  const { data } = useQuery({
    queryKey: TASK_KEY,
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
          <li
            key={task?.id}
            className={cn(
              task?.createdBy ? "font-bold text-gray-900" : "text-gray-600",
            )}
          >
            {task?.title}--{task?.id}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
