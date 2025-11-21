
"use client"
import { useEffect } from "react";
import { Box, Grid, Typography, useTheme, CircularProgress, Divider } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useLanguageStore } from "@/hooks/useLanguageStore";
import Image from "next/image";
import { useState } from "react";


export default function Main() {
    return (
        <div className='w-full flex justify-center flex-1 py-1 px-6' >
            <div className='w-full max-w-6xl'>
                <TextSlider />
                <Section1 />
                <Divider sx={{ my: 7 }} />
                <AboutBlue4Green />
                <Divider sx={{ my: 7 }} />
                <QuickDataRundown />
                <Divider sx={{ my: 7 }} />
                <DataAndViewerBlue4Green />
                <Divider sx={{ my: 7 }} />
                <DiscoverUseCases />
                <Divider sx={{ my: 7 }} />
                <CollabSection />
            </div>
        </div>
    )
}

function TextSlider() {
    const theme = useTheme();
    const { direction, translate } = useLanguageStore();

    // آرایه متون
    const texts = [
        translate("welcomeText"),           // متن کوتاه جاری
        translate("satelliteInfo")          // متن طولانی‌تر توضیحی
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, 7000); // زمان طولانی‌تر برای متن دوم (7 ثانیه)
        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <Box
            sx={{
                width: "100%",
                height: 120,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingX: 2,
                my: 2
            }}
        >
            <Typography
                sx={{
                    fontSize: { xs: 20, sm: 24, md: 28 },
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    animation: "slideText 3s ease",
                    direction: direction,
                    textAlign: "center",
                }}
                key={index} // برای رندر مجدد و اجرای انیمیشن
            >
                {texts[index]}
            </Typography>

            {/* انیمیشن */}
            <style jsx>{`
        @keyframes slideText {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
        </Box>
    );
}

function Section1() {
    return (
        <Box sx={{ width: "100%", my: 5 }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 5 }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                        }}
                    >
                        <iframe
                            className="rounded-[10px]"
                            width={"100%"}
                            height={"300px"}
                            src={"https://www.youtube.com/embed/Vyt0Se5Jrik"}
                            title="YouTube Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 7 }}>
                    <Swiper
                        height={300}
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 2000,     // هر ۲ ثانیه یک بار
                            disableOnInteraction: false, // بعد از Drag هم ادامه بده
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation, Autoplay]}
                        className="mySwiper"
                        effect="slide"
                    >
                        {Array.from({ length: 10 }, (_, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <ExternalImage />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </Grid>
            </Grid>
        </Box>
    )
}

function ExternalImage() {
    const [loading, setLoading] = useState<boolean>(true)

    return (
        <div className="relative w-full h-[300px] flex justify-center items-center">
            {loading && <CircularProgress />}
            <Image
                src={`https://picsum.photos/2000/2000?random=${Math.floor(Math.random() * 100)}`}
                alt="preview"
                fill
                className="object-cover rounded-lg"
                onLoadingComplete={() => setLoading(false)}
            />
        </div>
    )

}

function AboutBlue4Green() {
    const theme = useTheme();
    const { translate } = useLanguageStore();

    return (
        <Box sx={{ width: "100%", my: 5 }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 7 }} sx={{ position: "relative" }}>
                    {/* Box محتوا */}
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            width: "100%",
                            height: "300px",
                            padding: 3,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[300]
                                }`,
                            boxShadow:
                                theme.palette.mode === "dark"
                                    ? "0 4px 20px rgba(0,0,0,0.6)"
                                    : "0 4px 20px rgba(0,0,0,0.1)",
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? theme.palette.background.paper
                                    : theme.palette.background.default,
                            transition: "all 0.3s ease",
                            overflowY: "auto",
                            pt: 4, // فضای بالا برای legend
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("subtitleB4G")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("paragraph1B4G")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("paragraph2B4G")}
                        </Typography>
                    </Box>

                    {/* Legend */}
                    <Box
                        sx={{
                            borderRadius: 10,
                            position: "absolute",
                            top: -25,
                            left: 16,
                            padding: 1,
                            bgcolor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            fontWeight: 700,
                            fontSize: { xs: 18, sm: 20, md: 22 }, // responsive
                        }}
                    >
                        {translate("aboutB4G")}
                    </Box>
                </Grid>

                {/* ویدیو */}
                <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 5 }}>
                    <Box sx={{ position: "relative", width: "100%" }}>
                        <iframe
                            className="rounded-[10px]"
                            width="100%"
                            height="300px"
                            src="https://www.youtube.com/embed/m00N8umuKeM"
                            title="YouTube Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

function QuickDataRundown() {
    const theme = useTheme();
    const { translate } = useLanguageStore()

    return (
        <Box sx={{ width: "100%", my: 5, position: "relatives" }}>
            <Grid
                container
                spacing={2}
                sx={{
                    flexDirection: {
                        xs: "column-reverse", // xs و sm عکس می‌شود
                        sm: "column-reverse",
                        md: "row", // md به بالا عادی
                    },
                }}>
                <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 5 }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "300px",
                        }}
                    >
                        <Image
                            src={`https://picsum.photos/2000/2000?random=${Math.floor(Math.random() * 100)}`}
                            alt="logo4"
                            fill // تمام Box را پر می‌کند
                            style={{ objectFit: "cover", borderRadius: 10 }} // کاور دقیق
                            priority
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 7 }} sx={{ position: 'relative' }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            width: "100%",
                            height: "300px", // ارتفاع بیشتر برای Scroll مناسب
                            padding: 3,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.mode === "dark"
                                ? theme.palette.grey[700]
                                : theme.palette.grey[300]
                                }`,
                            boxShadow:
                                theme.palette.mode === "dark"
                                    ? "0 4px 20px rgba(0,0,0,0.6)"
                                    : "0 4px 20px rgba(0,0,0,0.1)",
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? theme.palette.background.paper
                                    : theme.palette.background.default,
                            transition: "all 0.3s ease",
                            overflowY: "auto", // فعال کردن Scroll عمودی
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("heatAnalysis")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("waterQuality")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("shadeMapping")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("treeIntelligence")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("irrigation")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("resilience")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("euNatureLaw")}
                        </Typography>
                    </Box>
                    {/* Legend */}
                    <Box
                        sx={{
                            borderRadius: 10,
                            position: "absolute",
                            top: -25,
                            left: 16,
                            p: 1,
                            bgcolor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            fontWeight: 700,
                            fontSize: { xs: 18, sm: 20, md: 22 }, // responsive
                        }}
                    >
                        {translate("quickDataTitle")}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

function DataAndViewerBlue4Green() {
    const theme = useTheme();
    const { translate } = useLanguageStore()

    return (
        <Box sx={{ width: "100%", my: 5 }}>
            <Grid container spacing={2}>

                <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 7 }} sx={{ position: "relative" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            width: "100%",
                            height: "300px", // ارتفاع بیشتر برای Scroll مناسب
                            padding: 3,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.mode === "dark"
                                ? theme.palette.grey[700]
                                : theme.palette.grey[300]
                                }`,
                            boxShadow:
                                theme.palette.mode === "dark"
                                    ? "0 4px 20px rgba(0,0,0,0.6)"
                                    : "0 4px 20px rgba(0,0,0,0.1)",
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? theme.palette.background.paper
                                    : theme.palette.background.default,
                            transition: "all 0.3s ease",
                            overflowY: "auto", // فعال کردن Scroll عمودی
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("dataViewerText1")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("dataViewerText2")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("dataViewerText3")}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{
                                mb: 3,
                                color: (theme) =>
                                    theme.palette.mode === "dark" ? "#ff6b6b" : "#d32f2f", // قرمز روشن در حالت Dark و قرمز کلاسیک در Light
                                fontWeight: 600, // می‌توانید پررنگ هم کنید
                            }}
                        >
                            {translate("dataViewerCredentials")}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            borderRadius: 10,
                            position: "absolute",
                            top: -25,
                            left: 16,
                            padding: 1,
                            bgcolor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            fontWeight: 700,
                            fontSize: { xs: 18, sm: 20, md: 22 }, // responsive
                        }}
                    >
                        {translate("dataViewerTitle")}
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 5 }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "300px",
                        }}
                    >
                        <Image
                            src={`https://picsum.photos/2000/2000?random=${Math.floor(Math.random() * 100)}`}
                            alt="logo4"
                            fill // تمام Box را پر می‌کند
                            style={{ objectFit: "cover", borderRadius: 10 }} // کاور دقیق
                            priority
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

function DiscoverUseCases() {
    const theme = useTheme();
    const { translate } = useLanguageStore()

    return (
        <Box sx={{ width: "100%", my: 5 }}>
            <Grid
                container
                spacing={2}
                sx={{
                    flexDirection: {
                        xs: "column-reverse", // xs و sm عکس می‌شود
                        sm: "column-reverse",
                        md: "row", // md به بالا عادی
                    },
                }}
            >
                <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 5 }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "300px",
                        }}
                    >
                        <Image
                            src={`https://picsum.photos/2000/2000?random=${Math.floor(Math.random() * 100)}`}
                            alt="logo4"
                            fill // تمام Box را پر می‌کند
                            style={{ objectFit: "cover", borderRadius: 10 }} // کاور دقیق
                            priority
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 7 }} sx={{ position: "relative" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            width: "100%",
                            height: "300px", // ارتفاع بیشتر برای Scroll مناسب
                            padding: 3,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.mode === "dark"
                                ? theme.palette.grey[700]
                                : theme.palette.grey[300]
                                }`,
                            boxShadow:
                                theme.palette.mode === "dark"
                                    ? "0 4px 20px rgba(0,0,0,0.6)"
                                    : "0 4px 20px rgba(0,0,0,0.1)",
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? theme.palette.background.paper
                                    : theme.palette.background.default,
                            transition: "all 0.3s ease",
                            overflowY: "auto", // فعال کردن Scroll عمودی
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("coolStreets")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("saferLake")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("irrigateMatters")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("shadeNeeded")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("treeCanopy")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("riverCorridor")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("playfields")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("euCompliance")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("droughtReadiness")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("equityCooling")}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
                            {translate("greeningDevelopments")}
                        </Typography>

                    </Box>
                    <Box
                        sx={{
                            borderRadius: 10,
                            position: "absolute",
                            top: -25,
                            left: 16,
                            padding: 1,
                            bgcolor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            fontWeight: 700,
                            fontSize: { xs: 18, sm: 20, md: 22 }, // responsive
                        }}
                    >
                        {translate("discoverTitle")}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

function CollabSection() {
    const theme = useTheme();

    return (
        <Box
            component="section"
            id="collab"
            sx={{
                py: { xs: 3, md: 3 },
                px: { xs: 2, md: 4 },
            }}
        >
            {/* عنوان بخش */}
            <Typography
                variant="h5"
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 4,
                    position: "relative",
                    "&::after": {
                        content: '""',
                        display: "block",
                        width: "60px",
                        height: "3px",
                        backgroundColor: theme.palette.primary.main,
                        mx: "auto",
                        mt: 1,
                        borderRadius: "2px",
                    },
                }}
            >
                In collaboration with:
            </Typography>

            {/* تصویر */}
            <Box
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[300]
                        }`,
                    boxShadow: theme.palette.mode === "dark"
                        ? "0 8px 24px rgba(0,0,0,0.6)"
                        : "0 8px 24px rgba(0,0,0,0.15)",
                    maxWidth: 1200,
                    mx: "auto",
                    maxHeight: 400,
                    position: "relative",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: theme.palette.mode === "dark"
                            ? "0 12px 30px rgba(0,0,0,0.7)"
                            : "0 12px 30px rgba(0,0,0,0.2)",
                    },
                }}
            >
                <Image
                    src={`https://picsum.photos/2000/2000?random=${Math.floor(Math.random() * 100)}`}
                    alt="Partner logos"
                    width={1200}
                    height={400}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                    }}
                    priority
                />
            </Box>
        </Box>
    );
}