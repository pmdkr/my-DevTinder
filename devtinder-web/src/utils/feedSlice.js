import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeUserFromFeed: (state, action) => {
            const newArray = state.filter((r) => r._id !== action.payload);
            return newArray;
        },
    }
})


export default feedSlice.reducer;
export const { addFeed, removeUserFromFeed } = feedSlice.actions;