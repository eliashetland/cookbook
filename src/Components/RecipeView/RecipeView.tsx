import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Ingredients from "../Ingredients/Ingredients";
import { IRecipe } from "../../Model/Recipe";
import { API } from "../../API/API";
import InstructionsList from "../InstructionList/InstructionsList";
import Amount from "../Amount/Amount";

function RecipeView() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [factor, setFactor] = useState<number>(1);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get(`api/recipe/${id}`);
      if (!res) return;
      if (!res.data.isOk) return;
      const fetchedRecipe: IRecipe = res.data.recipe;
      setRecipe(fetchedRecipe);
    } catch (error) {}
  };

  return (
    <>
      <h1>{recipe?.title}</h1>
      {recipe && (
        <Amount 
          unit={recipe?.quantityUnit} 
          quantity={recipe?.quantity} 
          callback ={(val:number) => {
            setFactor(val/recipe.quantity);
          }}
          />
      )}
      
      {recipe && <Ingredients ingredients={recipe?.ingredients} factor={factor}/>}
      {recipe && <InstructionsList instructions={recipe?.instructions} />}
    </>
  );
}

export default RecipeView;
