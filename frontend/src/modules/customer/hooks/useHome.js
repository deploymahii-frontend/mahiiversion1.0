import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../services/home.api";

export function useHome() {
  return useQuery({
    queryKey: ["homepage"],
    queryFn: async () => {
      // Try to provide fallback coordinates if none set by the user
      const fallbackCoords = { latitude: 20.0, longitude: 72.0 };

      const promises = [
        homeApi.getHome(),
        homeApi.getCategories(),
        homeApi.getNearbyBusinesses(fallbackCoords),
        homeApi.getTrendingProducts(),
      ];

      const results = await Promise.allSettled(promises);

      const normalize = (res) => {
        if (res.status !== "fulfilled") return null;
        // axios response -> res.value, body is in res.value.data
        const body = res.value.data;
        // most endpoints return { success, data: ... }
        if (body && Object.prototype.hasOwnProperty.call(body, "data")) {
          return body.data;
        }
        return body;
      };

      const home = normalize(results[0]);
      return {
        home,
        categories: normalize(results[1]),
        nearby: normalize(results[2]),
        products: normalize(results[3]),
        offers: home?.offers || [],
        moments: home?.moments || [],
      };
    },
    staleTime: 1000 * 60 * 5,
  });
}
