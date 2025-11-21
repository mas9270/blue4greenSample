"use client"
import { IconButton } from "@mui/material";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/hooks/useThemeStore";

export default function ThemeSelector() {
    const { theme, toggleTheme } = useThemeStore()

    return (
        <IconButton onClick={toggleTheme} sx={{ p: 0.5 }}>
            {theme === "light" ? <Moon size={25} /> : <Sun size={25} />}
        </IconButton>
    );
}
