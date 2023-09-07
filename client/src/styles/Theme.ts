import {createTheme} from "@mui/material";

export const customTheme = createTheme({
  typography: {
    fontFamily: "Roboto Condensed, sans-serif", // Replace 'YourCustomFont' with your actual font name
  },
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          boxSizing: "border-box",
        },
      },
    },
  },
});
