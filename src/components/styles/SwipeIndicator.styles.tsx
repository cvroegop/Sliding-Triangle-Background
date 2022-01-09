import { makeStyles } from "@mui/styles";
import { SwipeIndicatorProps } from '../types/common';

export const useStyles = makeStyles({
    arrowContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      position: "fixed",
      zIndex: 3,
      alignItems: "center",
      justifyContent: "space-between",
    },
    arrowRight: {
      height: 40,
      width: 40,
      color: "#4a4a4a",
      opacity: (props: SwipeIndicatorProps) =>
        props.pageIndex < props.componentsLength - 1 ? 0.8 : 0.2,
    },
    arrowLeft: {
      transform: "rotateY(0deg) rotate(180deg)",
      height: 40,
      width: 40,
      color: "#4a4a4a",
      opacity: (props: SwipeIndicatorProps) => (props.pageIndex > 0 ? 0.8 : 0.2),
    },
  });