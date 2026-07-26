import * as catalogService from "./catalog.service.js";

export async function createCatalogItem(req, res, next) {
  try {
    const item = await catalogService.createCatalogItem(req.user._id, req.body);

    return res.status(201).json({
      success: true,
      message: "Catalog item created successfully",
      data: item,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCatalogItem(req, res, next) {
  try {
    const item = await catalogService.getCatalogItem(req.params.id);

    return res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
}

export async function listCatalogItems(req, res, next) {
  try {
    const result = await catalogService.listCatalogItems(req.query);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCatalogItem(req, res, next) {
  try {
    const item = await catalogService.updateCatalogItem(
      req.params.id,
      req.user._id,
      req.body
    );

    return res.json({
      success: true,
      message: "Catalog item updated successfully",
      data: item,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCatalogItem(req, res, next) {
  try {
    await catalogService.deleteCatalogItem(req.params.id, req.user._id);

    return res.json({
      success: true,
      message: "Catalog item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
