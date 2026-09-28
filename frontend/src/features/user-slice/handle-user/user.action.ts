import { api } from "@/app/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

type User = {
  username: string;
  email: string;
  password: string;
};

export const signUpAsync = createAsyncThunk("users/signup", async (user: User, thunkApi) => {
  try {
    const response = await api.post('/users/signup', user);
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data?.message ?? "Something went wrong");
    }
    return thunkApi.rejectWithValue("Something went wrong");
  }
});


type LoginUser = Omit<User, 'username'>

export const LoginAsync = createAsyncThunk("users/login", async (user: LoginUser, thunkApi) => {
  try {
    const response = await api.post('/users/login', user);
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data?.message ?? "Something went wrong");
    }
    return thunkApi.rejectWithValue("Something went wrong");
  }
});

export const getUserAsync = createAsyncThunk("users/me", async (_, thunkApi) => {
    try{
        const response = await api.get('/users/me');

        return response.data.user
    } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data?.message ?? "Something went wrong");
    }
    return thunkApi.rejectWithValue("Something went wrong");
  }
})

export const getUserLogout = createAsyncThunk("users/logout", async (_, thunkApi) => {
    try{
        const response = await api.get('/users/logout');
        enqueueSnackbar('user Logout successfully')
        return response.data
    } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data?.message ?? "Something went wrong");
    }
    return thunkApi.rejectWithValue("Something went wrong");
  }
})


type GoogleLoginType = Omit<User, "password">
export const googleLoginAsync = createAsyncThunk(
  "users/logout",
  async(data : GoogleLoginType, thunkApi) => {
    try{
      const response = await api.post('/users/google', data);
      enqueueSnackbar("User Logged In", {variant:'success'})
      return response.data;
    } catch(error: unknown) {
      if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(error.response?.data?.message ?? "Something went wrong");
    }
    }
  }
)
