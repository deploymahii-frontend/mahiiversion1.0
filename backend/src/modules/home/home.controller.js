import * as homeService from "./home.service.js";

export const getHome = async (req, res, next) => {
  try {
    const data = await homeService.getHomeData();

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
