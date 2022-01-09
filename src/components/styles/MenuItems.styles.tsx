import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  menuContainer: {
    position: "fixed",
    display: "flex",
    margin: "30px 50px",
    zIndex: 4,
    ["@media (max-width:1000px)"]: {
      margin: "20px",
    },
  },
  menuItem: {
    margin: "0 10px",
  },
});
