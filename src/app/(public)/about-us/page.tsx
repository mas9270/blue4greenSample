"use client";

import { Box, Grid, Typography, useTheme, Container } from "@mui/material";
import { useLanguageStore } from "@/hooks/useLanguageStore";

export default function AboutPage() {
    const theme = useTheme();
    const { translate } = useLanguageStore();

    const cards = [
        {
            title: translate("heatWaterMonitoring"),
            text: translate("paragraph1B4G"),
        },
        {
            title: translate("smartIrrigation"),
            text: translate("paragraph2B4G"),
        },
        {
            title: translate("euNatureCompliance"),
            text: "Achieve measurable impact using satellite & local data.",
        },
    ];

    return (
        <Box sx={{ width: "100%", bgcolor: theme.palette.background.default }}>
            {/* Hero Section */}
            <Box
                sx={{
                    width: "100%",
                    height: { xs: 250, sm: 300, md: 450 },
                    backgroundImage: "url('https://picsum.photos/1600/600?blur=3')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.palette.primary.contrastText,
                    position: "relative",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "rgba(0,0,0,0.3)",
                    },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        textAlign: "center",
                        fontWeight: 700,
                        px: 3,
                        borderRadius: 2,
                        position: "relative",
                        zIndex: 1,
                        fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                        color: "#fff",
                    }}
                >
                    {translate("aboutB4G")}
                </Typography>
            </Box>

            {/* Main Content */}
            <Container sx={{ my: { xs: 4, md: 8 } }}>
                {/* Subtitle */}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        mb: { xs: 3, md: 5 },
                        textAlign: "center",
                        fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                    }}
                >
                    {translate("subtitleB4G")}
                </Typography>

                {/* Video Section */}
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        mb: { xs: 4, md: 6 },
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow:
                            theme.palette.mode === "dark"
                                ? "0 4px 20px rgba(0,0,0,0.6)"
                                : "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                >
                    <iframe
                        width="100%"
                        height={400}
                        src="https://www.youtube.com/embed/m00N8umuKeM"
                        title="YouTube Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: "none", borderRadius: 10 }}
                    />
                </Box>

                {/* Cards Section */}
                <Grid container spacing={4}>
                    {cards.map((card, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Box
                                sx={{
                                    p: 4,
                                    borderRadius: 3,
                                    boxShadow:
                                        theme.palette.mode === "dark"
                                            ? "0 4px 20px rgba(0,0,0,0.6)"
                                            : "0 4px 20px rgba(0,0,0,0.1)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-7px)",
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                                    },
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    backgroundColor:
                                        theme.palette.mode === "dark"
                                            ? theme.palette.background.paper
                                            : "#fff",
                                }}
                            >
                                <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" sx={{ lineHeight: 1.6, color: theme.palette.text.secondary }}>
                                    {card.text}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
