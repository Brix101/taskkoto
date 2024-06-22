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

const mutation = graphql(`
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

function Sample() {
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => request("http://localhost:5000/graphql", query),
  });

  const { mutate } = useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (variables) =>
      request("http://localhost:5000/graphql", mutation, variables),
  });

  function handleMutate() {}

  return (
    <>
      <h1 className="bg-red-300 p-10">Hello world</h1>
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
