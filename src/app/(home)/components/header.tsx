"use client";

import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemButton, IconButton } from "@mui/material";
import LanguageSelector from "@/components/languageSelector/languageSelector";
import ThemeSelector from "@/components/themeSelector/themeSelector";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import Image from "next/image";
import { useTheme, useMediaQuery } from '@mui/material';
// import { Menu } from "lucide-react"
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    const { language, translate } = useLanguageStore();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const isRtl = theme.direction === "rtl";

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const drawerContent = (
        <Box sx={{ width: 250, bgcolor: theme.palette.background.paper, height: '100%', p: 2 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} href="/applicatins">{translate("applications")}</ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} href="/about">{translate("about")}</ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="https://spatial-business-integration.com/en/contact" target="_blank" rel="noopener noreferrer">
                        {translate("contact")}
                    </ListItemButton>
                </ListItem>
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
            <Toolbar sx={{ display: 'flex', justifyContent: "center", py: 2, px: 3 }}>
                <div className="w-full max-w-6xl flex justify-between items-center">

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box sx={{ display: "flex", gap: 1, alignItems: 'center' }}>
                            <Image
                                src="https://aerius-images.s3.amazonaws.com/static/images/esa.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZN5JZY4GWRCCO5WT%2F20251121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20251121T073502Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=8eb7a3ea688302928d82837a7c234a262a05f8663e36f22cf2f4df8395f9b62e"
                                alt="logo"
                                width={50}
                                height={30}
                                priority
                                style={{ objectFit: "contain" }}
                                className="rounded"
                            />
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                AERIUS_EO
                            </Typography>
                        </Box>

                        {!isMdDown ? (
                            <>
                                <Button component={Link} href="/applicatins" variant="text">{translate("applications")}</Button>
                                <Button component={Link} href="/about" variant="text">{translate("about")}</Button>
                                <Button component="a" href="https://spatial-business-integration.com/en/contact" variant="text" target="_blank" rel="noopener noreferrer">{translate("contact")}</Button>
                            </>
                        ) :
                            <IconButton onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ThemeSelector />
                        <LanguageSelector />
                    </Box>

                    {/* Drawer تغییر به راست */}
                    <Drawer anchor={isRtl ? "right" : "left"} open={drawerOpen} onClose={toggleDrawer(false)}>
                        {drawerContent}
                    </Drawer>
                </div>
            </Toolbar>
        </AppBar>
    );
}
