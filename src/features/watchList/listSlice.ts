import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ListState } from "../../type";

const initialState: ListState = {
  myList: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    updateList: (state, action: PayloadAction<any>) => {
      state.myList = action.payload;
    },
    addList: (state, action: PayloadAction<any>) => {
      const imdbID = action.payload.item.imdbID;
      const existingItem = state.myList.find((item) => item.imdbID === imdbID);
      const data = localStorage.getItem("mylist");
      // Check if the movie is not already in the watchlist
      if (!existingItem) {
        // Add movie to watchlist
        state.myList = [...state.myList, action.payload.item];
        // Handling Localstorage for Multiple users
        if (data) {
          let listData = JSON.parse(data);
          listData[action.payload.id] = state.myList;
          localStorage.setItem("mylist", JSON.stringify(listData));
        } else {
          localStorage.setItem(
            "mylist",
            JSON.stringify({ [action.payload.id]: state.myList })
          );
        }
      }
    },
    removeList: (state, action: PayloadAction<any>) => {
      // Remove movie from myList and update local storage
      let newList = state.myList.filter(
        (item) => item.imdbID !== action.payload.imdbID
      );
      state.myList = newList;
      const data = localStorage.getItem("mylist");
      if (data) {
        let listData = JSON.parse(data);
        listData[action.payload.id] = state.myList;
        localStorage.setItem("mylist", JSON.stringify(listData));
      }
      if (state.myList.length === 0) {
        window.location.href = "/";
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateList, addList, removeList } = listSlice.actions;

export default listSlice.reducer;
