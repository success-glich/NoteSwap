import { createSlice } from "@reduxjs/toolkit";
import getUserDetailsFromToken from "../../config/jwt";
import isEmpty from "lodash/isEmpty";
import { load } from "react-cookies";
const initialState = {
  userData: {},
  tokens: localStorage,
  isUserLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { token } = action?.payload;
      const userData = getUserDetailsFromToken(token);

      state.tokens = {
        accessToken: token,
      };
      state.isUserLoggedIn = !isEmpty(userData);

      state.userData = userData;
    },
    getUserData: (state) => {
      const accessToken = localStorage.getItem("access_token");
      console.log(accessToken);
      const userData = getUserDetailsFromToken(accessToken);
      state.tokens = {
        accessToken: accessToken,
      };
      state.isUserLoggedIn = !isEmpty(userData);
      state.userData = userData;
    },
    userLogout: (state) => {
      localStorage.clear("access_token");
      state.userData = {};
      state.isUserLoggedIn = false;
    },
  },
});
export const { setUserData, getUserData, userLogout } = userSlice.actions;

export default userSlice.reducer;
