import "@/assets/globals.css";
import {
  QueryClient,
  QueryClientProvider,
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

function Sample() {
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => request("http://localhost:5000/graphql", query),
  });

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
