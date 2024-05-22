import { createSlice } from "@reduxjs/toolkit";

const storedUserData = localStorage.getItem('user');
const storedUser = storedUserData  ? JSON.parse(storedUserData) : null;



const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: storedUser?.username || null,
        email: storedUser?.email || null,
        userId: storedUser?.userId ||  null,
        error: null,
        loading: false,
        hero:false
    },
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutsucsess: (state) => {
            state.username = null;
            state.email = null;
            state.userId = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('user')
        },
        signUpSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },

        signOutFaliure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        showHero:(state)=>{
            state.hero = true
        },
        hideHero:(state)=>{
            state.hero=false
        }


    }
})
export const { signInStart, signOutFaliure, signInFailure, signInSuccess, signOutsucsess, signUpSuccess,showHero,hideHero } = userSlice.actions
export default userSlice.reducer