
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
    const { translate } = useLanguageStore()

    return (
        <Box sx={{ width: "100%", my: 5 }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 7 }}>

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
                        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                            {translate("quickDataTitle")}
                        </Typography>
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
                        <Typography variant="subtitle1" gutterBottom>
                            {translate("euNatureLaw")}
                        </Typography>
                    </Box>
                </Grid>
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
                            src={"https://www.youtube.com/embed/m00N8umuKeM"}
                            title="YouTube Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}