import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL =
  import.meta.env.API_BASE_URL || "http://localhost:3000/recipes";

async function fetchData(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: unknown) {
    let message = "Unknown error occurred";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    toast.error(`API error: ${message}`);
    throw error;
  }
}


export const api = {
  getAllRecipes: () => fetchData(`${API_BASE_URL}`),

  getRecipesByName: (name: string) =>
    fetchData(`${API_BASE_URL}/search?name=${encodeURIComponent(name)}`),

  getRecipesByFirstLetter: (letter: string) =>
    fetchData(`${API_BASE_URL}/search/letter/${encodeURIComponent(letter)}`),

  getRecipesByIngredient: (ingredient: string) =>
    fetchData(`${API_BASE_URL}/ingredient/${encodeURIComponent(ingredient)}`),

  getRecipesByArea: (area: string) =>
    fetchData(`${API_BASE_URL}/area/${encodeURIComponent(area)}`),

  getRecipesByCategory: (category: string) =>
    fetchData(`${API_BASE_URL}/category/${encodeURIComponent(category)}`),

  getRecipeById: (id: string) =>
    fetchData(`${API_BASE_URL}/${encodeURIComponent(id)}`),

  getRandomRecipe: () => fetchData(`${API_BASE_URL}/random`),

  getAllCategories: () => fetchData(`${API_BASE_URL}/categories`),

  getFiltersList: (type: "c" | "a" | "i") =>
    fetchData(`${API_BASE_URL}/filters?type=${encodeURIComponent(type)}`),
};
