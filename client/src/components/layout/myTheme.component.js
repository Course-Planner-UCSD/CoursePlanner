import { createMuiTheme } from "@material-ui/core/styles";

const myTheme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      dark: "#5ba1e6",
      main: "#69b2fa",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#f7ce5c",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  spacing: 1,
});

export default myTheme;
