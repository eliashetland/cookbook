import { API } from "../../API/API";
import Header from "../Header/Header";
import NewRecipeForm, { IRecipeFormData } from "./NewRecipeForm/NewRecipeForm";
import styles from "./NewRecipe.module.css";

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
            <Header></Header>
            <div className={styles.body}>
        
                <h2 className={styles.header}>Ny oppskrift</h2>
                <NewRecipeForm onSubmit={onSubmit}/>

            </div>
        </>
    );
}
