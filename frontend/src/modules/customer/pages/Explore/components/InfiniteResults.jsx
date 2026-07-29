import { useEffect } from "react";

export default function InfiniteResults({ fetchNextPage, hasNextPage }) {
  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage]);

  return null;
}
