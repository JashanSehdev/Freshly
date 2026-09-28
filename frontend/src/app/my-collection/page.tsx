'use client'
import { useAppDispatch, useAppSelector } from "@/features/store";
import HomePage from "../ui/home/home";
import { useEffect } from "react";
import { fetchAllRecipes, FetchRecipeByFilters } from "@/features/recipe-slice/handle-recipe/recipe.action";
import { redirect } from "next/navigation";

export default function MyCollection() {
  const user = useAppSelector((state) => state.user.User)
  console.log(user)

  const dispatch = useAppDispatch();
  if (!user) {
    redirect("/")
  }
  useEffect(() => {
    dispatch(FetchRecipeByFilters({userId : user.id}))
  })
  return (
    <div className="container">
      <HomePage/>
    </div>
  );
}
