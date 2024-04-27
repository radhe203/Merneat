import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: 'user',
    initialState:{
       username: null,email:null,userId:null, error: null, loading: false
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
        },
        signUpSuccess:(state)=>{
            state.loading = false;
            state.error = null;
        }
        
    }
})
export const {signInStart,signInFailure,signInSuccess,signOutsucsess,signUpSuccess} = userSlice.actions
export default userSlice.reducer