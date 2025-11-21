
"use client"
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from "next/image";
import { useLanguageStore } from "@/hooks/useLanguageStore";


export default function Main() {


    return (
        <div className='w-full flex justify-center flex-1 py-1 px-6' >
            <div className='w-full max-w-6xl'>
                <TextSlider />
                <Section1 />
            </div>
        </div>
    )
}



function TextSlider() {
    const theme = useTheme();
    const { direction, language } = useLanguageStore()
    
    const text =
        language === "en"
            ? "Welcome to Blue4Green"
            : language === "de"
                ? "Willkommen bei Blue4Green"
                : "Welcome to Blue4Green";

    return (
        <Box
            sx={{
                width: "100%",
                height: 100,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.palette.mode === "dark" ? "#0d0d0d" : "#f1f1f1",
            }}
        >
            <Typography
                sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    animation: "slideText 3s ease infinite",
                    direction: direction
                }}
            >
                {text}
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
        <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                        }}
                    >
                        <iframe
                            width={"100%"}
                            height={"300px"}
                            src={"https://www.youtube.com/embed/Vyt0Se5Jrik"}
                            title="YouTube Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
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
                        <SwiperSlide>
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src={`https://picsum.photos/2000/2000?random=${Math.floor(Math.random() * 100)}`}
                                    alt="preview"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src={`https://picsum.photos/2000/2000?random=${Math.floor(Math.random() * 100)}`}
                                    alt="preview"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src={`https://picsum.photos/2000/2000?random=${Math.floor(Math.random() * 100)}`}
                                    alt="preview"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src={`https://picsum.photos/2000/2000?random=${Math.floor(Math.random() * 100)}`}
                                    alt="preview"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src={`https://picsum.photos/2000/2000?random=${Math.floor(Math.random() * 100)}`}
                                    alt="preview"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src={`https://picsum.photos/2000/2000?random=${Math.floor(Math.random() * 100)}`}
                                    alt="preview"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </Grid>
            </Grid>
        </Box>
    )
}