import { API } from "../../API/API";
import styles from "./NewRecipe.module.css";
import NewRecipeForm, { IRecipeFormData } from "./NewRecipeForm/NewRecipeForm";

export default function NewRecipe() {


    const onSubmit = async (formdata: IRecipeFormData) => {
        
        try {
            const res = await API.post("api/recipe", formdata);
            console.log(res);
        } catch (error) {
            console.log(error);
        }



    }

    return (
        <>
            <div className={styles.body}>
        
                <h1 >Ny oppskrift</h1>
                <NewRecipeForm onSubmit={onSubmit}/>

            </div>
        </>
    );
}
