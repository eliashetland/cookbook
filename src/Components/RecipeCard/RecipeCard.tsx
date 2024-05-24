import styles from "./RecipeCard.module.css";
import { IRecipe } from "../../Model/Recipe";




function RecipeCard(recipe: IRecipe) {



    return (
      <div className={styles.recipeCard}>
        <h2 className={styles.header}>{recipe.title}</h2>
        <p className={styles.date}>klikk: {recipe.views}</p>
      </div>
    )
  }
  
  
  export default RecipeCard;