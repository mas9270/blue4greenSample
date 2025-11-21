"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/hooks/useLanguageStore";

export default function NotFoundPage() {
  const router = useRouter();
  const { language, translate } = useLanguageStore()

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: { xs: 80, sm: 120 }, fontWeight: "bold", mb: 2 }}>
        {translate("error404")}
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {translate("pageNotFound")}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => router.push("/")}
      >
        {translate("goBackHome")}
      </Button>
    </Box>
  );
}
