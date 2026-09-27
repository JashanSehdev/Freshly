'use client'
import { useAppDispatch } from "@/features/store";
import HomePage from "./ui/home/home";
import { useEffect } from "react";
import { fetchAllRecipes } from "@/features/recipe-slice/handle-recipe/recipe.action";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllRecipes())
  })
  return (
    <div className="container">
      <HomePage/>
    </div>
  );
}
