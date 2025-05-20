import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./RecipeInfoPage.module.css";
import { api } from "../../services/api";

type MealFromApi = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  strSource?: string;

  [key: `strIngredient${number}`]: string | null | undefined;
  [key: `strMeasure${number}`]: string | null | undefined;
};

function extractIngredients(recipe: MealFromApi): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(ingredient.trim());
    }
  }
  return ingredients;
}

const RecipeInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<MealFromApi | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<MealFromApi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    api
      .getRecipeById(id)
      .then((res) => {
        if (res.meals && res.meals.length > 0) {
          const recipeData = res.meals[0];
          setRecipe(recipeData);

          return api.getRecipesByCategory(recipeData.strCategory);
        } else {
          toast.error("Recipe not found");
          setRecipe(null);
          setRelatedRecipes([]);
          setLoading(false);
          return Promise.reject();
        }
      })
      .then((resCategory) => {
        if (resCategory && resCategory.meals) {
          const filtered = resCategory.meals.filter(
            (r: MealFromApi) => r.idMeal !== id
          );
          setRelatedRecipes(filtered);
        }
      })
      .catch((err) => {
        if (err) toast.error("Failed to load recipe: " + err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  const ingredients = extractIngredients(recipe);

  return (
    <div className={styles.container}>

      <div className={styles.leftPanel}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className={styles.image}
        />
      </div>

      <div className={styles.centerPanel}>
        <h1 className={styles.title}>{recipe.strMeal}</h1>

        <Link
          to={`/recipes?area=${encodeURIComponent(recipe.strArea)}`}
          className={styles.areaLink}
        >
          {recipe.strArea}
        </Link>

        <h2>Ingredients</h2>
        <ul className={styles.ingredientsList}>
          {ingredients.length > 0 ? (
            ingredients.map((ing, i) => (
              <li key={i}>
                <Link to={`/recipes?ingredient=${encodeURIComponent(ing)}`}>
                  {ing}
                </Link>
              </li>
            ))
          ) : (
            <li>No ingredients listed</li>
          )}
        </ul>

        <h2>Instructions</h2>
        <p className={styles.instructions}>{recipe.strInstructions}</p>
      </div>

 <aside className={styles.rightPanel}>
  {recipe.strCategory && (
    <>
      <h3>
        More from{" "}
        <Link to={`/recipes?category=${encodeURIComponent(recipe.strCategory)}`}>
          {recipe.strCategory}
        </Link>
      </h3>
    </>
  )}
  <ul className={styles.relatedList}>
    {relatedRecipes.length > 0 ? (
      relatedRecipes.map((r) => (
        <li key={r.idMeal}>
          <Link to={`/recipes/${r.idMeal}`}>
            {r.strMeal}
          </Link>
        </li>
      ))
    ) : (
      <li>No related recipes</li>
    )}
  </ul>
</aside>

    </div>
  );
};

export default RecipeInfoPage;
