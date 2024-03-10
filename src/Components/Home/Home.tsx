import styles from "./Home.module.css";
import pb from "../../lib/pocketbase";
import { useEffect, useState } from "react";
import { RecordModel } from "pocketbase";
import { Link } from "react-router-dom";
import RecipeCard from "../RecipeCard/RecipeCard";

function Home() {
  const [recipes, setRecipes] = useState<RecordModel[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const fetchedRecipes = await pb.collection("recipes").getFullList({
        sort: "-created",
      });
      setRecipes(fetchedRecipes);
    } catch (error) {}
  };

  return (
    <>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/admin">Admin</a>
          </li>
          <li>
            <button onClick={() => pb.authStore.clear()}>Logout</button>
          </li>
        </ul>
      </nav>

      <div className={styles.body}>
        <div className={styles.content}>
          <h2>Recipes</h2>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search for recipes"
              className={styles.searchInput}
            />
          </div>

          <ul className={styles.recipeList}>
            {recipes &&
              recipes.map((recipe: RecordModel) => (
                <li key={recipe.id} className={styles.listElement}>
                  <Link
                    className={styles.recipeLink}
                    to={`/recipes/${recipe.id}`}
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
