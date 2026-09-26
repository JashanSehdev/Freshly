import Image from "next/image";
import RecipiPage from "./ui/recipe/recipe";
import RecipiGeneralInfo from "./ui/recipe/add-recipe/recipe-general-information/recipe-general-information";
import AddRecipe from "./ui/recipe/add-recipe/add-recipe";

export default function Home() {
  return (
    <div className="container">
      <AddRecipe/>
    </div>
  );
}
