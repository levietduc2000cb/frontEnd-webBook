import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOKEN_USER } from "../../constant";
import * as api from "../../config/apiBackEnd";

export const bookItems = createSlice({
  name: "bookItems",
  initialState: {
    book: {
      name: "",
      description: "",
      price: "",
      author: "",
      seller: "",
      image: "",
    },
    loading: false,
    error: false,
    createBookState: null,
  },
  reducers: {
    setCreateBookState: (state) => {
      state.createBookState = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBookItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createBookItem.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status !== "success") {
          state.createBookState = false;
        } else {
          state.name = action.payload.data.name;
          state.description = action.payload.data.description;
          state.price = action.payload.data.price;
          state.author = action.payload.data.author;
          state.seller = action.payload.data.seller;
          state.image = action.payload.data.image;
          state.createBookState = true;
          console.log("Create book Success");
        }
      })
      .addCase(createBookItem.rejected, (state, action) => {})
      .addCase(updateBookItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateBookItem.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status !== "success") {
          state.createBookState = false;
        } else {
          state.name = action.payload.data.name;
          state.description = action.payload.data.description;
          state.price = action.payload.data.price;
          state.author = action.payload.data.author;
          state.seller = action.payload.data.seller;
          state.image = action.payload.data.image;
          state.createBookState = true;
          console.log("Update book Success");
        }
      })
      .addCase(updateBookItem.rejected, (state, action) => {});
  },
});

const { reducer, actions } = bookItems;
export default reducer;
export const { setCreateBookState } = actions;

//Create Product
export const createBookItem = createAsyncThunk(
  "bookItems/createBookItem",
  async (data) => {
    let formData = new FormData();
    formData.append("name", data.nameBook);
    formData.append("author", data.nameAuthor);
    formData.append("description", data.bookContent);
    formData.append("price", data.price);
    formData.append("image", data.imageFileBook);
    const TOKEN = localStorage.getItem(TOKEN_USER);
    const res = await fetch(`${api.pathProducts}/create`, {
      body: formData,
      headers: { authorization: `Bearer ${TOKEN}` },
      method: "post",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return res;
  }
);

export const updateBookItem = createAsyncThunk(
  "bookItems/updateBookItem",
  async (data) => {
    let formData = new FormData();
    if (data.nameBook) {
      formData.append("name", data.nameBook);
    }
    if (data.nameAuthor) {
      formData.append("author", data.nameAuthor);
    }
    if (data.bookContent) {
      formData.append("description", data.bookContent);
    }
    if (data.price) {
      formData.append("price", data.price);
    }
    if (data.imageFileBook) {
      formData.append("image", data.imageFileBook);
    }
    const TOKEN = localStorage.getItem(TOKEN_USER);
    const res = await fetch(`${api.pathProducts}/update/${data.id}`, {
      body: formData,
      headers: { authorization: `Bearer ${TOKEN}` },
      method: "put",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return res;
  }
);
