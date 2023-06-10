import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOKEN_USER, CART_ITEMS } from "../../constant";
import * as api from "../../config/apiBackEnd";

export const auth = createSlice({
  name: "auth",
  initialState: {
    myuser: {
      avatar: "",
      userName: "",
    },
    loading: false,
    error: false,
    messenger: null,
    currentUser: false,
  },
  reducers: {
    updateUser: (state, data) => {
      state.myuser.avatar = data.payload.avatar;
      state.myuser.userName = data.payload.name;
    },
    resetUser: (state) => {
      state.myuser.avatar = "";
      state.myuser.userName = "";
      state.currentUser = false;
      localStorage.removeItem(TOKEN_USER);
      localStorage.removeItem(CART_ITEMS);
    },
    setErrorDefault: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data.user === null) {
          state.myuser.avatar = "";
          state.myuser.userName = "";
          state.currentUser = false;
          localStorage.removeItem(TOKEN_USER);
        } else {
          state.myuser.userName = action.payload.data.userName;
          state.myuser.avatar = action.payload.data.avatarurl;
          state.currentUser = true;
        }
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === "Fail") {
          state.error = true;
        } else {
          state.myuser.userName = action.payload.data.userName;
          state.myuser.avatar = action.payload.data.avatarurl;
          state.currentUser = true;
          localStorage.setItem(TOKEN_USER, action.payload.data.token);
        }
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === "Fail") {
          state.error = true;
        } else {
          state.myuser.userName = action.payload.data.userName;
          state.myuser.avatar = action.payload.data.avatarUrl;
          state.currentUser = true;
          localStorage.setItem(TOKEN_USER, action.payload.data.token);
        }
      });
  },
});

const { reducer, actions } = auth;
export default reducer;
export const { updateUser, resetUser, setErrorDefault } = actions;

//Login mặc định
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await fetch(api.pathAuth, {
    headers: { authorization: `Bearer ${localStorage.getItem(TOKEN_USER)}` },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return res;
});

//Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data) => {
    let formData = {};
    formData.name = data.fullname;
    formData.email = data.email;
    formData.password = data.password;
    const res = await fetch(`${api.pathAuth}/register`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return res;
  }
);

//Login
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  const res = await fetch(`${api.pathAuth}/login`, {
    body: JSON.stringify({ email: data.email, password: data.password }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return res;
});
