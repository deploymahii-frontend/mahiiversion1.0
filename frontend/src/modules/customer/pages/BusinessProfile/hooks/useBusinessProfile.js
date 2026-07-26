import { useQuery } from "@tanstack/react-query";
import { businessApi } from "../services/business.api";

export function useBusinessProfile(slug) {
  return useQuery({
    queryKey: ["business", slug],
    queryFn: async () => {
      const profile = await businessApi.getProfile(slug);
      const id = profile.data._id || profile.data.id;
      const [products, services, offers, reviews, moments, related] = await Promise.all([
        businessApi.getProducts(id),
        businessApi.getServices(id),
        businessApi.getOffers(id),
        businessApi.getReviews(id),
        businessApi.getMoments(id),
        businessApi.getRelated(id),
      ]);
      return {
        business: profile.data,
        products: products.data,
        services: services.data,
        offers: offers.data,
        reviews: reviews.data,
        moments: moments.data,
        related: related.data,
      };
    },
    staleTime: 1000 * 60 * 5,
  });
}
