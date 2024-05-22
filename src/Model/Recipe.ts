export interface IIngredientList {
    _id: string;
    ingredient: string;
    amount: number;
    unit: string;
}


export interface IRecipe {
  _id: string;
  title: string;
  instructions: string[];
  ingredients: IIngredientList[];
  quantity: number;
  quantityUnit: string;
  imageUrl: string;
  imagePreviewUrl: string;
  createdAt: Date;
  views: number;
  
}
