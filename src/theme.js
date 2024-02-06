// import { createMuiTheme } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'

export default createMuiTheme({
  palette: {
    primary: {
      light: "#4caf50",
      main: "#4caf50",
      dark: "#388e3c",
      contrastText: '#fff',
    },
    secondary: {
      light: "#448aff",
      main: "#448aff",
      dark: "#1976d2",
      contrastText: '#fff',
    },
  },
  typography: {
    fontSize: 12,
    // fontFamily: 'Barlow Condensed',
    h1: {
      fontSize: 20,
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h2: {
      fontSize: 16,
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h3: {
      // fontSize: 13,
      fontSize: 15,
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h4: {
      fontSize: 14,
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h5: {
      fontSize: 13,
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h6: {
      fontSize: 12,
      fontWeight: 400,
      textTransform: "uppercase",
    },
    subtitle1: {
      fontSize: 11,
      textTransform: "uppercase",
    },
    subtitle2: {
      fontSize: 10,
      fontWeight: 400,
      textTransform: "uppercase",
    },
    body1: {
      fontSize: 13,
    },
    body2: {
      fontSize: 11
    },
    body3: {
      fontSize: 10
    },
  }
});