import React, { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect";
import Box from "@mui/material/Box";
import gsap from "gsap";
import { useStyles } from "./App.styles";
import { calcMoveTextTo, calcMoveTextFrom } from "../utils/movementBehaviour";
import MenuItems from "./MenuItems";
import Background from "./Background";
import SwipeIndicator from "./SwipeIndicator";
import DynamicComponent from "./DynamicComponent";

const components = [
  { _id: "02ijfo0i2jifj2wklds", name: "page_1", menuName: "Page 1", title: "Some interesting information about X", paragraph: "Entire any had depend and figure winter. Change stairs and men likely wisdom new happen piqued six. Now taken him timed sex world get. Enjoyed married an feeling delight pursuit as offered. As admire roused length likely played pretty to no. Means had joy miles her merry solid order." },
  { _id: "3iojwfji20i3efdjkfv", name: "page_2", menuName: "Page 2", title: "Some interesting information about Y", paragraph: "Demesne far hearted suppose venture excited see had has. Dependent on so extremely delivered by. Yet ﻿no jokes worse her why. Bed one supposing breakfast day fulfilled off depending questions. Whatever boy her exertion his extended. Ecstatic followed handsome drawings entirely mrs one yet outweigh. Of acceptance insipidity remarkably is invitation." },
  { _id: "239feowfi023fw30f39", name: "page_3", menuName: "Page 3", title: "Some interesting information about Z", paragraph: "It if sometimes furnished unwilling as additions so. Blessing resolved peculiar fat graceful ham. Sussex on at really ladies in as elinor. Sir sex opinions age properly extended. Advice branch vanity or do thirty living. Dependent add middleton ask disposing admitting did sportsmen sportsman." },
];

export function App() {
  const classes = useStyles();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState<number | null>();
  const [swipeUsed, setSwipeUsed] = useState<boolean>(false);
  let movingText = useRef<HTMLInputElement | null>(null);
  let tl = gsap.timeline();
  const movementEase = "back.out(1)";
  const duration = 2;
  const forwardDirection = prevIndex < pageIndex;

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
