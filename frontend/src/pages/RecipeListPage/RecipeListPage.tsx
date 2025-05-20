import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import type { Recipe, MealFromApi } from "../../types/recipe";
import { mapMealToRecipe } from "../../utils/mapMealToRecipe";
import styles from "./RecipeListPage.module.css";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const areaFilter = searchParams.get("area");
  const ingredientFilter = searchParams.get("ingredient");
  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    setLoading(true);
    let fetchPromise;

    if (areaFilter) {
      fetchPromise = api.getRecipesByArea(areaFilter);
    } else if (ingredientFilter) {
      fetchPromise = api.getRecipesByIngredient(ingredientFilter);
    } else if (categoryFilter) {
      fetchPromise = api.getRecipesByCategory(categoryFilter);
    } else {
      fetchPromise = api.getAllRecipes();
    }

    fetchPromise
      .then((data) => {
        let recipesArray: Recipe[] = [];

        if (Array.isArray(data)) {
          recipesArray = data;
        } else if (data?.meals) {
          recipesArray = data.meals.map((meal: MealFromApi) =>
            mapMealToRecipe(meal)
          );
        }

        setRecipes(recipesArray);
      })
      .catch((error) =>
        toast.error("Failed to fetch recipes: " + error.message)
      )
      .finally(() => setLoading(false));
  }, [areaFilter, ingredientFilter, categoryFilter]);

  return (
    <div className={styles.container}>
      {loading && <p>Loading...</p>}
      {!loading && recipes.length === 0 && <p>No recipes found.</p>}
      {!loading && recipes.length > 0 && (
        <ul className={styles.recipeList}>
          {recipes.map((r) => (
            <li key={r.id} className={styles.recipeItem}>
              <Link to={`/recipes/${r.id}`} className={styles.recipeLink}>
                <img src={r.thumbnail} alt={r.name} className={styles.thumbnail} />
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeListPage;
