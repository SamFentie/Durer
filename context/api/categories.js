import axios from "axios";
import { headerConfig, basURL } from "./apiConfig";

const categoriesEndpoint = `${basURL}/categories`;

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(
      categoriesEndpoint,
      categoryData,
      headerConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(categoriesEndpoint, headerConfig);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Update a category by ID
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axios.put(
      `${categoriesEndpoint}/${categoryId}`,
      categoryData,
      headerConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Delete a category by ID
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(
      `${categoriesEndpoint}/${categoryId}`,
      headerConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
