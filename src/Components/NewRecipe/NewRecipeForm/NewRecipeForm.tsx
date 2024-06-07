import React, { useState } from "react";
import styles from "./NewRecipeForm.module.css";

interface RecipeFormProps {
  onSubmit: (formData: IRecipeFormData) => void;
}

interface Ingredient {
  ingredient: string;
  amount: number;
  unit: string;
}
export interface IRecipeFormData {
  title: string;
  instructions: string[];
  ingredients: Ingredient[];
  quantity: number;
  quantityUnit: string;
  imageUrl: string;
  imagePreviewUrl: string;
}

export default function NewRecipe({ onSubmit }: RecipeFormProps) {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [quantityUnit, setQuantityUnit] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      title,
      instructions,
      ingredients,
      quantity,
      quantityUnit,
      imageUrl,
      imagePreviewUrl: imageUrl,
    };
    console.log(formData);

    onSubmit(formData);
    // Pass the form data to the onSubmit function
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>Tittel:</label>
      <input
        type="text"
        value={title}
        placeholder="Tittel"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Steg</label>
      <ol className={styles.instructionsList}>
        {instructions.map((instruction, index) => (
          <li key={index}>
            <div className={styles.instructionsRow}>
              <input
                key={index}
                type="text"
                value={instruction}
            placeholder="(f.eks) start med det tørre"

                onChange={(e) => {
                  const newInstructions = [...instructions];
                  newInstructions[index] = e.target.value;
                  setInstructions(newInstructions);
                }}
              />

              <button
                type="button"
                onClick={() => {
                  const newInstructions = [...instructions];
                  newInstructions.splice(index, 1);
                  setInstructions(newInstructions);
                }}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => setInstructions([...instructions, ""])}
      >
        Legg til steg
      </button>

      <label>Ingredienser:</label>
      {ingredients.map((ingredient, index) => (
        <div key={index} className={styles.ingredientRow}>
          <input
            type="text"
            value={ingredient.ingredient}
            placeholder="Ingrediens"

            onChange={(e) => {
              const newIngredients = [...ingredients];
              newIngredients[index].ingredient = e.target.value;
              setIngredients(newIngredients);
            }}
          />
          <input
            type="number"
            className={styles.ingAmount}
            value={ingredient.amount}
            onChange={(e) => {
              const newIngredients = [...ingredients];
              newIngredients[index].amount = parseInt(e.target.value);
              setIngredients(newIngredients);
            }}
          />
          <input
            type="text"
            value={ingredient.unit}
            placeholder="enhet"
            onChange={(e) => {
              const newIngredients = [...ingredients];
              newIngredients[index].unit = e.target.value;
              setIngredients(newIngredients);
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newIngredients = [...ingredients];
              newIngredients.splice(index, 1);
              setIngredients(newIngredients);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setIngredients([
            ...ingredients,
            { ingredient: "", amount: 0, unit: "" },
          ])
        }
      >
        Legg til ingrediens
      </button>

      <label>Antall:</label>
      <div className={styles.amountRow}>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <input
          type="text"
          placeholder="(f.eks) boller"
          value={quantityUnit}
          onChange={(e) => setQuantityUnit(e.target.value)}
        />
      </div>
      <label>Bilde URL:</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button type="submit">Legg til</button>
    </form>
  );
}
