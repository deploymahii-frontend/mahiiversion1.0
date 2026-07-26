import { useInfiniteQuery } from "@tanstack/react-query";
import { searchApi } from "../services/search.api";

export function useInfiniteSearch(query, filters) {
  return useInfiniteQuery({
    queryKey: ["search", query, filters],
    queryFn: ({ pageParam = 1 }) => searchApi.search({ query, filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data?.hasMore) {
        return lastPage.data.page + 1;
      }
      return undefined;
    },
  });
}
