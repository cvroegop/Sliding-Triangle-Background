import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  pageContainer: {
    padding: "150px",
    position: "absolute",
    zIndex: 3,
    maxWidth: "780px",
    margin: "0 auto",
    ["@media (max-width:1000px)"]: {
      maxWidth: "100%",
      padding: "10%",
      margin: "10% 0 0 0",
    },
  },
  page: {
    zIndex: 9,
  },
});
