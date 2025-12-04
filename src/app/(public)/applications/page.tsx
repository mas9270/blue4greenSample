import EarthPage from "./components/earthPage"
import { Box } from "@mui/material"
export default function Applications() {
    return (
        <Box sx={{ width: "100%", display: 'flex', justifyContent: "start", alignItems: "start", height: "100%", flex: 1 }} >
            <EarthPage />
        </Box>
    )
}
