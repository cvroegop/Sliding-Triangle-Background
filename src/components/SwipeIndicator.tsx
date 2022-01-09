import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import { SwipeIndicatorProps } from "./types/common";
import { useStyles } from "./styles/SwipeIndicator.styles";

function SwipeIndicator(props: SwipeIndicatorProps) {
  const { pageIndex, componentsLength } = props;
  const classes = useStyles(props);
  let indicatorLeft = useRef<SVGSVGElement | null>(null);
  let indicatorRight = useRef<SVGSVGElement | null>(null);
  const colors = ["#4a4a4a", "#c7c7c7"];
  let tlHome = gsap.timeline({
    repeat: -1,
    repeatRefresh: true,
  });

  useEffect(() => {
    colors.forEach((color, index) => {
      if (pageIndex > 0) {
        tlHome.fromTo(
          indicatorLeft.current,
          { xPercent: 0 },
          { xPercent: -80, ease: "power1.inOut", duration: 2, color: color },
          2 * index
        );
      }
      if (pageIndex < componentsLength - 1) {
        tlHome.fromTo(
          indicatorRight.current,
          { xPercent: 0 },
          { xPercent: 80, ease: "power1.inOut", duration: 2, color: color },
          2 * index
        );
      }
    });
  }, [pageIndex]);

  return (
    <Box className={classes.arrowContainer}>
      <ArrowForwardIosIcon
        className={classes.arrowLeft}
        ref={indicatorLeft}
      />
      <ArrowForwardIosIcon
        className={classes.arrowRight}
        ref={indicatorRight}
      />
    </Box>
  );
}

export default SwipeIndicator;
