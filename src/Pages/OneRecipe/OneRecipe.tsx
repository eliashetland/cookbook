import { useParams } from "react-router-dom";
import { useState } from "react";
import { IRecipe } from "../../Model/Recipe";
import { API } from "../../API/API";
import styles from "./OneRecipe.module.css";
import Amount from "../../Components/Amount/Amount";
import Ingredients from "../../Components/Ingredients/Ingredients";
import InstructionsList from "../../Components/InstructionList/InstructionsList";
import Header from "../../Components/Header/Header";
import { useQuery } from "@tanstack/react-query";

function OneRecipe() {
  const { id } = useParams();
  const [factor, setFactor] = useState<number>(1);

  const { data: recipe, isLoading } = useQuery({
    queryKey: [`recipe_${id}`],
    queryFn: async () => {
      const res = await API.get(`api/recipe/${id}`);
      if (!res) return;
      if (!res.data.isOk) return;
      const fetchedRecipe: IRecipe = res.data.recipe;
      return fetchedRecipe;
    },
    staleTime: 1000 * 60 * 60 * 2,
  });

  return (
    <>
      <Header />
      {isLoading && <div>Loading...</div>}
      {!isLoading && !recipe && <div>Recipe not found</div>}
      {!isLoading && recipe && (
        <div className={styles.container1}>
          <div className={styles.container2}>
            <h1>{recipe?.title}</h1>
            {recipe && (
              <Amount
                unit={recipe?.quantityUnit}
                quantity={recipe?.quantity}
                callback={(val: number) => {
                  setFactor(val / recipe.quantity);
                }}
              />
            )}

            {recipe && (
              <Ingredients ingredients={recipe?.ingredients} factor={factor} />
            )}
            {recipe && <InstructionsList instructions={recipe?.instructions} />}
          </div>
        </div>
      )}
    </>
  );
}

export default OneRecipe;
