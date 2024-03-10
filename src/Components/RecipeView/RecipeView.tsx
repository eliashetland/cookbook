import { useParams } from "react-router-dom";
import pb from "../../lib/pocketbase";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "react";
import Ingredients from "../Ingredients/Ingredients";

function RecipeView() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecordModel | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      if (!id) {
        return;
      }

      const fetchedRecipe = await pb.collection("recipes").getOne(id);
      setRecipe(fetchedRecipe);
      
    } catch (error) {}}

    return (
      <>
        <h1>{recipe?.title}</h1>
        {recipe && <Ingredients props={recipe?.ingredients} />}
        {/* <InstructionsList description={recipe?.description} /> */}
      </>
    );
  
}


export default RecipeView;