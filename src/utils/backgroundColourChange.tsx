export const colorTriangle = [
"#ff9e6a",
"#8ff9bc",
"#ff8d9f",
"#ff9e6a",
"#8ff9bc",
"#ff8d9f",
  
];

export const colorBackground = [
"#faffd4",
"#d2ffff",
"#ffe6fe",
"#faffd4",
"#d2ffff",
"#ffe6fe",
  
];
export function changeColour(index: number, element: string, setterFunction: (color: string) => void, delay: number | undefined) {
  if (element === "triangle") {
    const colorIndex = index / 2 - (index % 2) / 2;
    setterFunction(colorTriangle[colorIndex]);
  } else if (element === "background") {
    const colorIndex = index / 2 + (index % 2) / 2;

    setTimeout(() => {
      setterFunction(colorBackground[colorIndex]);
    }, delay || 0);
  }
}