import React, { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect";
import Box from "@mui/material/Box";
import gsap from "gsap";
import { useStyles } from "./styles/App.styles";
import { calcMoveTextTo, calcMoveTextFrom } from "../utils/movementBehaviour";
import { components } from '../utils/componentData';
import MenuItems from "./MenuItems";
import Background from "./Background";
import SwipeIndicator from "./SwipeIndicator";
import DynamicComponent from "./DynamicComponent";

export function App() {
  const classes = useStyles();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState<number | null>();
  const [swipeUsed, setSwipeUsed] = useState<boolean>(false);
  let movingText = useRef<HTMLInputElement | null>(null);
  let tl = gsap.timeline();
  const forwardDirection = prevIndex < pageIndex;

  const movementEase = "back.out(1)";
  const duration = 2;

  useEffect(() => {
    if (!(prevIndex === 0 && pageIndex === 0)) {
      const backgroundState = pageIndex % 2;
      const moveTextTo = calcMoveTextTo(forwardDirection);
      const moveTextFrom = calcMoveTextFrom(forwardDirection, backgroundState);
      tl.fromTo(
        movingText,
        { x: `0` },
        {
          duration: duration,
          ease: movementEase,
          x: `${moveTextTo}vw`,
        }
      ).fromTo(
        movingText,
        { x: `${moveTextFrom}vw` },
        {
          duration: duration,
          ease: movementEase,
          x: `0`,
        }
      );
    }
  }, [pageIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchDown = touchPosition;

    if (!touchDown) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 10 && pageIndex < components.length - 1) {
      setPrevIndex(pageIndex);
      setPageIndex(pageIndex + 1);
      if (!swipeUsed) setSwipeUsed(true);
    }

    if (diff < -10 && pageIndex > 0) {
      setPrevIndex(pageIndex);
      setPageIndex(pageIndex - 1);
      if (!swipeUsed) setSwipeUsed(true);
    }

    setTouchPosition(null);
  };

  return (
    <>
      <MenuItems
        components={components}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
      {!swipeUsed && isMobile && components && (
        <SwipeIndicator
          pageIndex={pageIndex}
          componentsLength={components.length}
        />
      )}
      <Box>
        <Box
          className={classes.pageContainer}
          ref={(el: any) => {
            movingText = el;
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <DynamicComponent
            className={classes.page}
            components={components}
            pageIndex={pageIndex}
            delay={1000}
          />
        </Box>
      </Box>
      <Background
        index={pageIndex}
        prevIndex={prevIndex}
        setPrevIndex={setPrevIndex}
        forwardDirection={forwardDirection}
      />
    </>
  );
}
