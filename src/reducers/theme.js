import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light',
  
  reducers: {
    toggleTheme: (state, action) => {
      const newTheme = action.payload || (state === 'light' ? 'dark' : 'light');
      return newTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;