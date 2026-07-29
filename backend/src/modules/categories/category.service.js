import * as repository from "./category.repository.js";

export const getAllCategories = () => repository.findAllCategories();
export const getCategoryById = (id) => repository.findCategoryById(id);
export const createCategory = (data) => repository.createCategory(data);
export const updateCategory = (id, data) => repository.updateCategory(id, data);
export const deleteCategory = (id) => repository.deleteCategory(id);
