"use client";

import { Box, Button, Typography, useTheme, Container } from "@mui/material";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorPageProps {
    error: string;
    refresh: () => void;
}

export default function ErrorPage({ error, refresh }: ErrorPageProps) {
    const theme = useTheme();
    const { translate } = useLanguageStore();

    return (
        <Container
            maxWidth="md"
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    p: 4,
                    borderRadius: 3,
                    bgcolor:
                        theme.palette.mode === "dark"
                            ? "background.paper"
                            : "grey.100",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 4px 20px rgba(0,0,0,0.6)"
                            : "0 4px 20px rgba(0,0,0,0.1)",
                }}
            >
                <ErrorOutlineIcon
                    sx={{
                        fontSize: { xs: 60, md: 80 },
                        color: theme.palette.error.main,
                        mb: 2,
                    }}
                />
                <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, mb: 2 }}
                >
                    {translate("error404")}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ mb: 3, color: theme.palette.text.secondary }}
                >
                    {translate("pageNotFound")}
                </Typography>
                {error && (
                    <Typography
                        variant="body2"
                        sx={{ mb: 3, color: theme.palette.error.main }}
                    >
                        {error}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={refresh}
                    sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: { xs: 14, md: 16 },
                        "&:hover": { transform: "scale(1.05)" },
                        transition: "all 0.2s ease",
                    }}
                >
                    {translate("goBackHome")}
                </Button>
            </Box>
        </Container>
    );
}
