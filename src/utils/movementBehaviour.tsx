import { isMobile } from "react-device-detect";

export function calcMoveTextTo(forwardDirection: boolean): number {
  return forwardDirection ? -100 : 110;
}

export function calcMoveTextFrom(forwardDirection: boolean, backgroundState: number): number {
  if (forwardDirection) {
    return backgroundState ? -60 : 100;
  } else {
    return -60;
  }
}

export function calcMoveTriangleTo(forwardDirection: boolean, newColourSequence: boolean): number {
  if (newColourSequence) {
    if (forwardDirection) {
      return !isMobile ? -260 : -600; // remove block completely from screen on left side
    } else {
      return 100; // remove block completely from screen on right side
    }
  } else {
    if (forwardDirection) {
      return !isMobile ? -130 : -300; // move block from right to halfway in screen
    } else {
      return -5; // move block from halfway to rightside in screen
    }
  }
}

export function calcMoveFrom(forwardDirection: boolean): number {
  if (!isMobile) {
    return forwardDirection ? 100 : -260;
  } else {
    return forwardDirection ? 100 : -600;
  }
}

export function calcMoveTriangleTo2(backgroundState: number): number {
  if (!isMobile) {
    return backgroundState ? -130 : -5
  } else {
    return backgroundState ? -300 : -5
  }
}

export function calcMoveBackgroundTo(forwardDirection: boolean): number {
  return forwardDirection ? -140 : -15;
}
