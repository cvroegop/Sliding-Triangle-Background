import React, { useEffect, useState } from "react";
import { useStyles } from "./styles/DynamicComponent.styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DynamicComponentProps, Component } from './types/common';

function DynamicComponent(props: DynamicComponentProps) {
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
