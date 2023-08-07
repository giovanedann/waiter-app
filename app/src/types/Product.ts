export type Ingredient = {
  name: string;
  icon: string;
  _id: string;
}

export type Product = {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: Ingredient[];
}
