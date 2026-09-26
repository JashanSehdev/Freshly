"use client";

import { CssBaseline } from "@mui/material";
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import '../globals.css';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  palette: {
    primary: {
      main: "#EC4700",
      contrastText: "#f3f5fd",
    },
    secondary: {
      main: "#977ae0",
      contrastText: "#f5f4fb",
    },
    success: {
      main: "#009843",
      contrastText: "#0a0f1a",
    },
    warning: {
      main: "#da9600",
      contrastText: "#0a0f1a",
    },
    error: {
      main: "#df2225",
      contrastText: "#f3f5fd",
    },
    info: {
      main: "#0081d0",
      contrastText: "#0a0f1a",
    },
    background: {
      default: "#f3f5f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#1F1D1B",
      secondary: "#545861",
    },
  },
  typography: {
    fontFamily: "var(--font-space-grotesk), sans-serif",
    h1: {
      fontWeight: 800,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton : {
      styleOverrides: {
        contained: {
          padding: '0.2rem 0.7rem',
          borderRadius: '20px'
        },
      }
    }
  }
});

export const MUIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline
          enableColorScheme
       
        />
        {children}
      </ThemeProvider>
      </StyledEngineProvider>
    </AppRouterCacheProvider>
  );
};