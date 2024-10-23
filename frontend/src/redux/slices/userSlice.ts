import { createSlice } from "@reduxjs/toolkit";

const storedUserData = localStorage.getItem("user");
const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: storedUser?.username || null,
    email: storedUser?.email || null,
    userId: storedUser?.userId || null,
    addressLine1: storedUser?.addressLine1 || null,
    city: storedUser?.city || null,
    country: storedUser?.country || null,
    error: null,
    loading: false,
    hero: false,
    baseUrl: Number(import.meta.env.VITE_PRODUCTION)
      ? import.meta.env.VITE_API_PROD_URL
      : import.meta.env.VITE_API_DEV_URL,
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
      state.addressLine1 = action.payload.addressLine1;
      state.city = action.payload.city;
      state.country = action.payload.country;
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
      state.addressLine1 = null;
      state.city = null;
      state.country = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
    },
    signUpSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },

    signOutFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    showHero: (state) => {
      state.hero = true;
    },
    hideHero: (state) => {
      state.hero = false;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.userId = action.payload._id;
      state.addressLine1 = action.payload.addressLine1;
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    restAurentCreationSatrt: (state) => {
      state.loading = true;
      state.error = null;
    },
    restAurentCreationSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    restAurentCreationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  signInStart,
  signOutFaliure,
  signInFailure,
  signInSuccess,
  signOutsucsess,
  signUpSuccess,
  showHero,
  hideHero,
  updateStart,
  updateSuccess,
  updateFailure,
  restAurentCreationFailure,
  restAurentCreationSatrt,
  restAurentCreationSuccess,
} = userSlice.actions;
export default userSlice.reducer;
