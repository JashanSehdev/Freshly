"use client";

// import SubmitButton from "@/components/auth-components/buttons/buttons";
// import {
//   AuthInput,
//   AuthPasswordInput,
//   GoogleAuth,
// } from "@/components/auth-components/input-field/inputs";
import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import styles from "./login.module.css";
import { FormHelperText } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
// import { FormData } from "@/types/Form";
import { useState } from "react";
// import { handleEmailLogin } from "@/action/auth.action";

export default function Page() {
  const loginImage = 'https://imgs.search.brave.com/upaDKd9NNWpTUFEFHtxJm3Tn6YqpmUuYu_NNwvXMtr0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L2ZyZWUtcGhvdG8v/dG9wLXZpZXctdGFi/bGUtZnVsbC1mb29k/XzIzLTIxNDkyMDky/MzAuanBnP2dhPUdB/MS4xLjE2MjMxMzQ5/Ny4xNzkwNTUxODQ0/JnNlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw'
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log("SUCCESS", data);
  };

  return (
    <Box className={styles.outerBox}>
      <Box className={styles.innerBox}>
        <h1 className={styles.logo}>voyger</h1>
        <h2 className={styles.title}>
          {" "}
          <p>Make your</p> <p>perfect Food</p>{" "}
        </h2>
        <Box className={styles.googleButton}>
            <Button>Google Button</Button>
        </Box>

        <p className={styles.divider}>or</p>
        <form className={styles.inputField} onSubmit={handleSubmit(onSubmit)}>
          <Box>
            {/* <AuthInput register={register} name="email" placeholder="Email" /> */}
            
            <TextField
                label="email"
            />
          </Box>
          <Box>
            {/* <AuthPasswordInput
              register={register}
              name="password"
              placeholder="Password"
            /> */}
            <TextField 
                type="password"
                label="password"
            />
          </Box>
          <Box className={styles.submitButton}>
            <Button type="submit">Login</Button>
          </Box>

          <Box className={styles.subtitle}>
            Don't have an account? <span>SignUp</span>
          </Box>
        </form>
      </Box>
      <Box component={'img'} className={styles.image} src={loginImage} alt="Login Image" />
    </Box>
  );
}
