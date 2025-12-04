"use client"
import { Box, } from "@mui/material"

import Earth2 from "./earth2"
// import Leaflet from "./leaflet"

export default function EarthPage() {


    return (
        <Box sx={{ width: "100%", display: 'flex', justifyContent: "flex-start", alignItems: "flex-start", height: "100%", flex: 1, flexDirection: "column" }} >
            <Earth2 />
            {/* <Leaflet mapHeight="calc(100vh - 80px)" /> */}
        </Box>
    )
}
