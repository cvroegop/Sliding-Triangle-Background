import React, { useEffect, useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Component } from './types/common';

interface ComponentProps {
    className: string
    pageIndex: number;
    delay: number;
    components: Component[];
}

export const useStyles = makeStyles({
    titleMargins: {
      margin: "5% 0"
    },
    ParagraphMargins: {
        margin: "5% 0",
        ["@media (max-width:1000px)"]: {
          maxWidth: "0 10%",
        },
      },
  });

function DynamicComponent(props: ComponentProps) {
  const classes = useStyles();
  const { pageIndex, delay, components } = props;
  const [currentComponent, setCurrentComponent] = useState<Component>(components[pageIndex])

  useEffect(() => {
    setTimeout(() => {
      setCurrentComponent(components[pageIndex])
    }, delay || 0);

  }, [pageIndex])

  return (
    <Box className={classes.titleMargins}>
      <Typography variant="h2">{currentComponent.title}</Typography>
      <Typography variant="body1">{currentComponent.paragraph}</Typography>
    </Box>
  );
}

export default DynamicComponent;
