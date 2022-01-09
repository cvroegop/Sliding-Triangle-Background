import { makeStyles } from "@mui/styles";
import { BackgroundProps } from "./types/common";

export const useStyles = makeStyles({
  staticBackground: {
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: (props: BackgroundProps) => props.staticBackgroundColor,
    position: "fixed",
  },

  movingTriangle: {
    left: "85vw",
    width: "2000px",
    height: "2000px",
    backgroundColor: (props: BackgroundProps) => props.triangleColor,
    position: "fixed",
    transform: "rotateY(0deg) rotate(45deg)",
    zIndex: 2,
    overflow: "hidden",
    ["@media (max-width:1000px)"]: {
      left: "78vw",
      width: "1400px",
      height: "1400px",
    },
  },

  movingBackground: {
    position: "fixed",
    width: "150vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: (props: BackgroundProps) => props.movingBackgroundColor,
  },
});
