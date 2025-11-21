"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageSelector from "@/components/languageSelector/languageSelector";
import ThemeSelector from "@/components/themeSelector/themeSelector";
import { useLanguageStore } from "@/hooks/useLanguageStore";

export default function Header() {
    const { translate } = useLanguageStore();
    const pathname = usePathname();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const isRtl = theme.direction === "rtl";

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

    const navLinks = [
        { href: "/applications", label: translate("applications") },
        { href: "/about-us", label: translate("about") },
        {
            href: "https://spatial-business-integration.com/en/contact",
            label: translate("contact"),
            external: true,
        },
    ];

    const drawerContent = (
        <Box
            sx={{ width: 250, bgcolor: theme.palette.background.paper, height: "100%", p: 2 }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <List>
                {navLinks.map((link) => (
                    <ListItem key={link.href} disablePadding>
                        {link.external ? (
                            <ListItemButton
                                component="a"
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ borderRadius: 1, px: 2 }}
                            >
                                {link.label}
                            </ListItemButton>
                        ) : (
                            <ListItemButton
                                component={Link}
                                href={link.href}
                                sx={{
                                    bgcolor: pathname === link.href ? theme.palette.action.selected : "transparent",
                                    color: pathname === link.href ? theme.palette.primary.main : "inherit",
                                    fontWeight: pathname === link.href ? 600 : 400,
                                    borderRadius: 1,
                                    px: 2,
                                }}
                            >
                                {link.label}
                            </ListItemButton>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar
            position="sticky"
            color="transparent"
            elevation={0}
            sx={{
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                bgcolor: "background.paper",
                backdropFilter: "blur(10px)",
                zIndex: (theme) => theme.zIndex.appBar + 1,
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "center", py: 2, px: 3 }}>
                <Box className="w-full max-w-6xl flex justify-between items-center">
                    {/* لوگو */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Box
                            sx={{ display: "flex", gap: 1, alignItems: "center", cursor: "pointer" }}
                            component={Link}
                            href="/"
                        >
                            <Image
                                src="/esa.webp"
                                alt="logo"
                                width={50}
                                height={30}
                                priority
                                style={{ objectFit: "contain" }}
                                className="rounded"
                            />
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                AERIUS_EO
                            </Typography>
                        </Box>

                        {/* لینک‌ها */}
                        {!isMdDown &&
                            navLinks.map((link) =>
                                link.external ? (
                                    <Button
                                        key={link.href}
                                        component="a"
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="text"
                                        sx={{ borderRadius: 1, px: 2 }}
                                    >
                                        {link.label}
                                    </Button>
                                ) : (
                                    <Button
                                        key={link.href}
                                        component={Link}
                                        href={link.href}
                                        variant="text"
                                        sx={{
                                            fontWeight: pathname === link.href ? 600 : 400,
                                            color: pathname === link.href ? theme.palette.primary.main : "inherit",
                                            bgcolor: pathname === link.href ? theme.palette.action.selected : "transparent",
                                            borderRadius: 1,
                                            px: 2,
                                            "&:hover": { bgcolor: theme.palette.action.hover },
                                        }}
                                    >
                                        {link.label}
                                    </Button>
                                )
                            )}
                    </Box>

                    {/* Theme & Language */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <ThemeSelector />
                        <LanguageSelector />
                        {isMdDown && (
                            <IconButton onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Box>

                    {/* Drawer */}
                    <Drawer anchor={isRtl ? "right" : "left"} open={drawerOpen} onClose={toggleDrawer(false)}>
                        {drawerContent}
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
