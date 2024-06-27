import { useInfiniteQuery } from "@tanstack/react-query";
import { graphql } from "gql.tada";
import request from "graphql-request";
import { Button } from "./components/ui/button";

const query = graphql(`
  query getTasks($first: Int, $after: Cursor) {
    tasks(first: $first, after: $after) {
      pageInfo {
        startCursor
        endCursor
        totalCount
        hasPrevPage
        hasNextPage
        length
      }
      edges {
        cursor
        node {
          id
          title
          description
          status
          assignee {
            id
            name
            email
          }
          createdBy {
            id
            name
            email
          }
        }
      }
    }
  }
`);

export function Sample() {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["tasks"],
    queryFn: async ({ pageParam }) => {
      const data = await request("http://localhost:5000/graphql", query, {
        first: 10,
        after: pageParam,
      });
      return data.tasks;
    },
    getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor,
  });

  return (
    <div>
      <Button onClick={() => fetchNextPage()}>Click me</Button>
      <ul>
        {data?.pages.map((page) => {
          return page.edges.map((edge) => {
            return <li key={edge.node.id}>{edge.node.title}</li>;
          });
        })}
      </ul>
    </div>
  );
}
