import { useQuery } from "@tanstack/react-query";
import { offerApi } from "../services/offer.api";

export function useOffers(){
  const { data, isLoading } = useQuery(["owner","offers"], () => offerApi.list().then(r=>r.data));
  return {
    offers: data || [],
    loading: isLoading,
  };
}
