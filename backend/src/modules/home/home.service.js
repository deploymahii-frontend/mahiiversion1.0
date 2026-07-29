import * as repository from "./home.repository.js";

export const getHomeData = async () => {
  const [featured, trending, moments, offers] = await Promise.all([
    repository.getFeaturedShops(),
    repository.getTrendingShops(),
    repository.getLatestMoments(),
    repository.getActiveOffers(),
  ]);

  return {
    featured,
    trending,
    moments,
    offers,
  };
};
