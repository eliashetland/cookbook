import { RecordModel } from "pocketbase";
import styles from "./RecipeCard.module.css";




function RecipeCard(recipe: RecordModel) {



    return (
      <div className={styles.recipeCard}>
        <h2 className={styles.header}>{recipe.title}</h2>
        <p className={styles.date}>{new Date(recipe.created).toLocaleDateString() }</p>
      </div>
    )
  }
  
  
  export default RecipeCard;