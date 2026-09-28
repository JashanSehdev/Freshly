import {  User } from "@/app/type/recipe.type";
import { createSlice } from "@reduxjs/toolkit";
import { getUserAsync } from "./handle-user/user.action";

type InitialState = {
    User: null | User
}

const initialState : InitialState = {
    User : null
}

export const userSlice = createSlice({
    name : 'user slice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
       builder.addCase(getUserAsync.fulfilled, (state, action) => {
        const fetchedUser = {
            id : action.payload.id,
            username : action.payload.username
        }
        state.User = fetchedUser
       })
    }
})

export default userSlice.reducer 