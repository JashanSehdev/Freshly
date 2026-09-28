"use client";

import { Box, Button, TextField } from "@mui/material";
import styles from "./signup.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { SignUpInputType, signupSchema } from "./signup.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/features/store";
import { getUserAsync, signUpAsync } from "@/features/user-slice/handle-user/user.action";
import { redirect } from "next/navigation";

export default function Page() {
  const dispatch = useAppDispatch()
  const loginImage =
    "https://imgs.search.brave.com/upaDKd9NNWpTUFEFHtxJm3Tn6YqpmUuYu_NNwvXMtr0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L2ZyZWUtcGhvdG8v/dG9wLXZpZXctdGFi/bGUtZnVsbC1mb29k/XzIzLTIxNDkyMDky/MzAuanBnP2dhPUdB/MS4xLjE2MjMxMzQ5/Ny4xNzkwNTUxODQ0/JnNlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignUpInputType> = async (data: SignUpInputType) => {
    await dispatch(signUpAsync(data))
    await dispatch(getUserAsync())
    redirect("/")
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
            <TextField
              label="username"
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register('username')}
            />
          </Box>

          <Box>
            <TextField
              label="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />
          </Box>
          <Box>
            <TextField
              type="password"
              label="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
            />
          </Box>
          <Box className={styles.submitButton}>
            <Button type="submit">Sign Up</Button>
          </Box>

          <Box className={styles.subtitle}>
            Already have an account?{" "}
            <Link href={"/login"}>
              <span>Login</span>
            </Link>
          </Box>
        </form>
      </Box>
      <Box component={"img"} className={styles.image} src={loginImage} alt="Login Image" />
    </Box>
  );
}
