import { createSlice } from "@reduxjs/toolkit";

// Define the three DaisyUI themes in the same order as in your Tailwind config.
const themes = ["dark", "cupcake", "light"];
const initialTheme = localStorage.getItem("theme") || themes[0];

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: initialTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      // Get the index of the current theme and cycle to the next one.
      const currentIndex = themes.indexOf(state.theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      state.theme = themes[nextIndex];
      localStorage.setItem("theme", state.theme);
    },
    // Optionally, add an action to set a specific theme.
    setTheme: (state, action) => {
      if (themes.includes(action.payload)) {
        state.theme = action.payload;
        localStorage.setItem("theme", state.theme);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
