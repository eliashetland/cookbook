import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../RecipeCard/RecipeCard";
import { IRecipe } from "../../Model/Recipe";
import { API } from "../../API/API";
import Header from "../Header/Header";

function Home() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {

      const res = await API.get("api/recipe");
      if (!res) return;
      if (!res.data.isOk) return;
      const fetchedRecipes: IRecipe[] = res.data.recipe;
      setRecipes(fetchedRecipes);
    } catch (error) {}
  };

  return (
    <>
      <Header />


      <div className={styles.body}>
        <div className={styles.content}>
          <h2>Oppskrifter</h2>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Søk etter oppskrift"
              className={styles.searchInput}
            />
          </div>

          <ul className={styles.recipeList}>
            {recipes &&
              recipes.map((recipe: IRecipe) => (
                <li key={recipe._id} className={styles.listElement}>
                  <Link
                    className={styles.recipeLink}
                    to={`/cookbook/recipes/${recipe._id}`}
                  >
                    <RecipeCard {...recipe} />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
