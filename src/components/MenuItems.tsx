import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { isMobile } from "react-device-detect";
import { MenuItemsProps, Component } from './types/common';
import { useStyles } from "./styles/MenuItems.styles";

export default function MenuItems(props: MenuItemsProps) {
  const { components, pageIndex, setPageIndex } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePageChange = (newPageIndex: number) => {
    if (pageIndex !== newPageIndex) {
      setPageIndex(newPageIndex);
    }
    if (isMobile){
      setAnchorEl(null);
    }
  };

  if (!isMobile) {
    const items = components.map((item: Component, index: number) => {
      const { _id, menuName } = item;
      return (
        <Button
          key={`menuItem_id_${_id}`}
          variant="text"
          onClick={() => handlePageChange(index)}
        >
          <Typography className={classes.menuItem}>{menuName}</Typography>
        </Button>
      );
    });
    return <Box className={classes.menuContainer}>{items}</Box>;
  }

  const items = components.map((item: Component, index: number) => {
    const { _id, menuName } = item;
    return <MenuItem key={`menuItem_id_${_id}`} onClick={() => handlePageChange(index)}>{menuName}</MenuItem>;
  });

  return (
    <div className={classes.menuContainer}>
      <Button
        style={{color: "#023626"}}
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {items}
      </Menu>
    </div>
  );
}
