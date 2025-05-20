export interface Recipe {
  id: string;
  name: string;
  area: string;
  category: string;
  thumbnail: string;
}

export interface MealFromApi {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strCategory: string;
  strMealThumb: string;
  strYoutube?: string;
  strSource?: string;

  [key: `strIngredient${number}`]: string | null | undefined;
  [key: `strMeasure${number}`]: string | null | undefined;
}

