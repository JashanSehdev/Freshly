'use client'


import { auth } from "@/lib/firebase";
import {  signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

export const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const data = {
      username : result.user.displayName ?? "",
      email : result.user.email ?? ""
    }
    return data
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};




