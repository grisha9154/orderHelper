import { Box, LinearProgress } from "@mui/material";
import { GridOverlay } from "@mui/x-data-grid";

export const GridLoader = () => (
  <GridOverlay>
    <Box sx={{ position: "absolute", top: 0, width: "100%" }}>
      <LinearProgress />
    </Box>
  </GridOverlay>
);
