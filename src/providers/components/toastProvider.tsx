"use client";

import { Toaster } from "react-hot-toast";
import { useThemeStore } from "@/hooks/useThemeStore";

export default function ToastProvider() {
    const { theme } = useThemeStore()
    const direction = "ltr";

    return (
        <Toaster
            // position={direction === "rtl" ? "top-left" : "top-right"}
            position={"top-right"}
            toastOptions={{
                style: {
                    direction: direction,
                    background: theme === "dark" ? "#1f1f1f" : "#fff",
                    color: theme === "dark" ? "#fafafa" : "#000",
                    border:
                        theme === "dark"
                            ? "1px solid rgba(255,255,255,0.15)"
                            : "1px solid rgba(0,0,0,0.1)",
                },
                success: {
                    iconTheme: {
                        primary: theme === "dark" ? "#4ade80" : "#16a34a",
                        secondary: theme === "dark" ? "#1f1f1f" : "#fff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: theme === "dark" ? "#f87171" : "#dc2626",
                        secondary: theme === "dark" ? "#1f1f1f" : "#fff",
                    },
                },
            }}
        />
    );
}
