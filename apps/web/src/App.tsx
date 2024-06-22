import "@/assets/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Sample />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Sample() {
  return (
    <>
      {" "}
      <h1 className="bg-red-300 p-10">Hello world</h1>
    </>
  );
}

export default App;
