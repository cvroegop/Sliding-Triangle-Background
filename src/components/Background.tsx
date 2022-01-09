import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useStyles } from "./Background.styles";
import {
  calcMoveTriangleTo,
  calcMoveTriangleTo2,
  calcMoveFrom,
  calcMoveBackgroundTo,
} from "../utils/movementBehaviour";
import { changeColour, colorTriangle, colorBackground } from "../utils/backgroundColourChange";

function difference(a: number, b: number) {
  return Math.abs(a - b);
}

interface BackgroundProps {
  index: number;
  prevIndex: number;
  setPrevIndex: (index: number) => void;
  forwardDirection: boolean;
}

export default function Background(props: BackgroundProps) {
  const { index, prevIndex, setPrevIndex, forwardDirection } = props;
  let movingTriangle = useRef<HTMLInputElement | null>(null);
  let movingBackground = useRef<HTMLInputElement | null>(null);
  let tl = gsap.timeline();
  const movementEase = "back.out(1.6)";
  const duration = 2.5;
  const [prevBackgroundState, setPrevBackgroundIndex] = useState(0);
  const [prevPosition, setPrevPosition] = useState(100);
  const [triangleColor, setTriangleColor] = useState(colorTriangle[0]);
  const [movingBackgroundColor, setMovingBackgroundColor] = useState(colorBackground[0]);
  const [staticBackgroundColor, setStaticBackgroundColor] = useState(colorBackground[0]);

  const classes = useStyles({
    triangleColor,
    movingBackgroundColor,
    staticBackgroundColor,
  });

  useEffect(() => {
    const backgroundState = index % 2;
    const newTriangleColourSequence =
      difference(prevIndex, index) > 1 ||
      (forwardDirection &&
        prevBackgroundState === 1 &&
        backgroundState === 0) ||
      (!forwardDirection && prevBackgroundState === 0 && backgroundState === 1);

    const moveTriangleTo = calcMoveTriangleTo(
      forwardDirection,
      newTriangleColourSequence
    );
    const moveFrom = calcMoveFrom(forwardDirection);
    const moveTriangleTo2 = calcMoveTriangleTo2(backgroundState);
    const moveBackgroundTo = calcMoveBackgroundTo(forwardDirection);

    if (newTriangleColourSequence) {
      tl.fromTo(
        movingTriangle,
        { x: `${prevPosition}vw` },
        {
          duration: duration,
          ease: movementEase,
          x: `${moveTriangleTo}vw`,
          onComplete: changeColour,
          onCompleteParams: [index, "triangle", setTriangleColor],
        }
      )
        .fromTo(
          movingTriangle,
          { x: `${moveFrom}vw` },
          {
            duration: duration,
            ease: movementEase,
            x: `${moveTriangleTo2}vw`,
          }
        )
        .fromTo(
          movingBackground,
          { x: `${moveFrom}vw` },
          {
            duration: duration,
            ease: movementEase,
            x: `-15vw`,
            onStart: changeColour,
            onStartParams: [index, "background", setMovingBackgroundColor],
            onComplete: changeColour,
            onCompleteParams: [index, "background", setStaticBackgroundColor],
          },
          `-=${duration}`
        );
    } else {
      tl.fromTo(
        movingTriangle,
        { x: `${prevPosition}vw` },
        {
          duration: duration,
          ease: movementEase,
          x: `${moveTriangleTo}vw`,
          onStart: changeColour,
          onStartParams: [
            index,
            "background",
            setMovingBackgroundColor,
            forwardDirection ? 900 : 100,
          ],
        }
      ).to(
        movingBackground,
        {
          duration: duration,
          ease: movementEase,
          x: `${moveBackgroundTo}vw`,
          onStart: changeColour,
          onStartParams: [index, "background", setStaticBackgroundColor],
        },
        `-=${duration}`
      );
    }

    setPrevIndex(index);
    setPrevBackgroundIndex(backgroundState);
    setPrevPosition(moveTriangleTo2 || moveTriangleTo);
  }, [index]);

  return (
    <>
      <div className={classes.staticBackground}></div>
      <div
        ref={(el: any) => {
          movingBackground = el;
        }}
        className={classes.movingBackground}
      ></div>
      <div
        ref={(el: any) => {
          movingTriangle = el;
        }}
        className={classes.movingTriangle}
      ></div>
    </>
  );
}
