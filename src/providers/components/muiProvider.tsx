"use client";

import React, { useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline, Box, CircularProgress } from "@mui/material";
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
  const { theme, setTheme } = useThemeStore();
  const { direction } = useLanguageStore();

  useEffect(() => {
    const localStorageTheme = typeof window !== "undefined" ? localStorage.getItem("app-theme") : "";
    if (localStorageTheme !== "dark" && localStorageTheme !== "light") {
      setTheme("light");
    } else {
      setTheme(localStorageTheme as "dark" | "light");
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
        <ThemeProvider theme={themeConfig(theme, direction)}>
          <CssBaseline />
          {props.children}
        </ThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
}

function themeConfig(theme: "dark" | "light", direction: "rtl" | "ltr") {
  const baseTheme = theme === "dark"
    ? createTheme({
      direction,
      palette: { mode: "dark", divider: "rgba(255, 255, 255, 0.12)" },
    })
    : createTheme({
      direction,
      palette: { mode: "light", divider: "rgba(0, 0, 0, 0.12)" },
    });

  // اضافه کردن استایل Scrollbar سفارشی
  baseTheme.components = {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          /* Scrollbar پیش‌فرض */
          scrollbarWidth: "thin",
          scrollbarColor:
            theme === "dark"
              ? "rgba(255,255,255,0.4) rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.4) rgba(0,0,0,0.1)",

          /* Webkit برای Chrome, Edge, Safari */
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
            borderRadius: "3px",
            transition: "background 0.3s",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
          },
        },
      },
    },
  };

  return baseTheme;
}
