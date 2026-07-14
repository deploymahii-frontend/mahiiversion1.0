import Category from "./category.model.js";

export const findAllCategories = () => Category.find({});
export const findCategoryById = (id) => Category.findById(id);
export const findCategoryBySlug = (slug) => Category.findOne({ slug });
export const createCategory = (data) => Category.create(data);
export const updateCategory = (id, data) =>
  Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const deleteCategory = (id) => Category.findByIdAndDelete(id);
