import { useEffect, useState } from "react";
import { IIngredientList } from "../../Model/Recipe";
import styles from "./Ingredients.module.css";

interface IngredientsProps {
  ingredients: IIngredientList[];
  factor: number;
}

export default function Ingredients({ingredients, factor}: IngredientsProps) {
  const [currentIngredients, setcurrentIngredients] = useState<IIngredientList[] | null>(null);
  const [currentFactor, setCurrentFactor] = useState<number>(1);

  useEffect(() => {
    setCurrentFactor(factor);
    setcurrentIngredients(ingredients);

  }, [ingredients, factor]);

  return (
    <>
      <h1 className={styles.title}>Du trenger</h1>

      <table className={styles.table}>
        <tbody className={styles.tbody}>
          {currentIngredients &&
            currentIngredients.map((ingredientList: IIngredientList) => (
              
              <tr key={ingredientList._id} className={styles.tr}>
                <td className={styles.check}><input type="checkbox" id={ingredientList._id} /></td>
                <td className={styles.ingredient}> {ingredientList.ingredient}</td>
                <td className={styles.amount}> {(ingredientList.amount * currentFactor).toFixed(1) }</td>
                <td className={styles.unit}> {ingredientList.unit}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
