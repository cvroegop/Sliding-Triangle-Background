import { makeStyles } from "@mui/styles";

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