import type { Recipe, MealFromApi } from "../types/recipe";


export const mapMealToRecipe = (meal: MealFromApi): Recipe => ({
  id: meal.idMeal,
  name: meal.strMeal,
  area: meal.strArea,
  category: meal.strCategory,
  thumbnail: meal.strMealThumb,
});
