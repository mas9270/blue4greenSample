"use client";

import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box, CircularProgress } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { useThemeStore } from "@/hooks/useThemeStore";
import { useLanguageStore } from "@/hooks/useLanguageStore";

export default function MuiProviders(props: { children: React.ReactNode }) {
  const { children } = props;
  return <ThemeConfig>{children}</ThemeConfig>;
}

function ThemeConfig(props: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore()
  const { direction } = useLanguageStore()


  useEffect(() => {
    const localStorageTheme = typeof window !== "undefined" ? localStorage.getItem("app-theme") : "";
    if (localStorageTheme !== "dark" && localStorageTheme !== "light") {
      setTheme("light")
    } else {
      setTheme(localStorageTheme)
    }
  }, []);

  const cacheRtl = createCache({
    key: direction === "rtl" ? "muirtl" : "muiltr",
    stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [],
  });

  if (!theme) {
    return (
      <>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <AppRouterCacheProvider>

      <CacheProvider value={cacheRtl}>
        <ThemeProvider
          theme={themeConfig(theme, direction)}
        >
          <CssBaseline />
          {props.children}
        </ThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
}

function themeConfig(theme: "dark" | "light", direction: "rtl" | "ltr") {
  switch (theme) {
    case "dark":
      const dark = createTheme({
        direction: direction,
        palette: {
          mode: "dark",
          divider: "rgba(255, 255, 255, 0.12)",
        },
        // typography: {
        //   fontFamily: ["IRANSansX"].join(","),
        // },
      });
      return dark;
    case "light":
      const light = createTheme({
        direction: direction,
        palette: {
          mode: "light",
          divider: "rgba(0, 0, 0, 0.12)",
        },
        // typography: {
        //   fontFamily: ["IRANSansX"].join(","),
        // },
      });
      return light;
  }
}
