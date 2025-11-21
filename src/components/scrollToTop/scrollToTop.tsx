"use client";

import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import { ArrowUp } from "lucide-react";
import { useThemeStore } from "@/hooks/useThemeStore";

export default function ScrollToTopButton() {
    const { theme } = useThemeStore()
    const [visible, setVisible] = useState(false);

    // نمایش دکمه هنگام اسکرول
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Fab
            onClick={scrollToTop}
            size="small"
            sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 1000,
                bgcolor: theme === "dark" ? "#fff" : "#000",
                color: theme === "dark" ? "#000" : "#fff",
                "&:hover": {
                    bgcolor: theme === "dark" ? "#eee" : "#222",
                },
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease",
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? "auto" : "none",
            }}
            aria-label="Scroll to top"
        >
            <ArrowUp size={20} />
        </Fab>
    );
}
