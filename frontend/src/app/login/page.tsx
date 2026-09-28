"use client";

import { Box, Button, TextField } from "@mui/material";
import styles from "./login.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { LoginInputType, loginSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/features/store";
import { getUserAsync, googleLoginAsync, LoginAsync } from "@/features/user-slice/handle-user/user.action";
import Cookies from 'js-cookie';
import { redirect } from "next/navigation";
import {  useRouter } from "next/navigation";
import { handleGoogleLogin } from "@/actions/auth.action";


export default function LoginPage() {
  const loginImage = 'https://imgs.search.brave.com/upaDKd9NNWpTUFEFHtxJm3Tn6YqpmUuYu_NNwvXMtr0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L2ZyZWUtcGhvdG8v/dG9wLXZpZXctdGFi/bGUtZnVsbC1mb29k/XzIzLTIxNDkyMDky/MzAuanBnP2dhPUdB/MS4xLjE2MjMxMzQ5/Ny4xNzkwNTUxODQ0/JnNlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw'
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const router = useRouter()
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>({
    resolver :zodResolver(loginSchema)
  })
  const onSubmit: SubmitHandler<LoginInputType> = async(data : LoginInputType) =>{
    setLoading(true)
    await dispatch(LoginAsync(data));
    await dispatch(getUserAsync())
    setLoading(false)
    router.refresh()
  }

    const handleGoogleButton = async () => {
      try {
        const data = await handleGoogleLogin();
        if (!data.username || !data.email)
          throw new Error("Username or password not found from Google");
        const sendData = {
          username: data.username,
          email: data.email,
        };
        await dispatch(googleLoginAsync(sendData));
        await dispatch(getUserAsync());
        redirect("/")
      } catch (error) {
        console.error(error);
        throw error;
      }
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
            <Button onClick={handleGoogleButton}>Google Button</Button>
        </Box>

        <p className={styles.divider}>or</p>
        <form className={styles.inputField} onSubmit={handleSubmit(onSubmit)}>
          <Box>        
            <TextField
            fullWidth
                label="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
            />  
          </Box>
          <Box>

            <TextField 
            fullWidth
                type="password"
                label="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
            />
          </Box>
          <Box className={styles.submitButton}>
            <Button loading={loading} type="submit">Login</Button>
          </Box>

          <Box className={styles.subtitle}>
            Do not have an account? <Link href={'/signup'}><span>Signup</span></Link>
          </Box>
        </form>
      </Box>
      <Box component={'img'} className={styles.image} src={loginImage} alt="Login Image" />
    </Box>
  );
}
