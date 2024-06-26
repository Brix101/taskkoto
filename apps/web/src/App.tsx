import "@/assets/globals.css";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { graphql, readFragment } from "gql.tada";
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

const taskFragment = graphql(`
  fragment TaskFragment on Task {
    id
    title
    description
    assignee {
      id
      email
      name
    }
    createdBy {
      id
      email
      name
    }
  }
`);

type Task = ReturnType<NonUndefined<(typeof taskFragment)["__apiType"]>>;

const query = graphql(
  `
    query Tasks {
      tasks {
        ...TaskFragment
      }
    }
  `,
  [taskFragment],
);

const createTaskMutation = graphql(
  `
    mutation createTask($input: CreateTaskInput) {
      createTask(input: $input) {
        ...TaskFragment
      }
    }
  `,
  [taskFragment],
);

type MutationInput = Parameters<
  NonUndefined<(typeof createTaskMutation)["__apiType"]>
>[0];

const TASK_KEY = ["tasks"];

const useCreateTask = () => {
  return useMutation({
    mutationKey: ["createTask"],
    onMutate: async (variables) => {
      queryClient.cancelQueries({ queryKey: TASK_KEY });
      const previousValue = queryClient.getQueryData(["tasks"]);
      queryClient.setQueryData(TASK_KEY, (old: any) => {
        return {
          tasks: [
            ...old.tasks,
            {
              title: variables?.title,
              description: variables?.description,
              status: variables?.status,
            },
          ],
        };
      });
      return { previousValue };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(TASK_KEY, (old: any) => {
        return {
          tasks: [...old.tasks.filter((task: any) => task.id), data.createTask],
        };
      });
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(TASK_KEY, context?.previousValue);
    },
    mutationFn: async (input: MutationInput["input"]) => {
      const data = await request(
        "http://localhost:5000/graphql",
        createTaskMutation,
        { input },
      );

      return data;
    },
  });
};

function Sample() {
  const { data } = useQuery({
    queryKey: TASK_KEY,
    queryFn: async () => {
      const data = await request("http://localhost:5000/graphql", query);
      const tasks = readFragment(taskFragment, data.tasks ?? []);
      return { tasks };
    },
  });

  const { mutate } = useCreateTask();

  function handleMutate() {
    mutate({
      title: "New task",
      description: "New task description",
      status: "DONE",
    });
  }

  return (
    <>
      <Button onClick={handleMutate}>addd</Button>
      <ul>
        {data?.tasks?.map((task, index) => (
          <li
            key={`${index}-${task?.id}`}
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
