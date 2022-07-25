import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export default styled(Button)({
    textTransform: "none",
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    root: {
      borderRadius: 8,
    },
    fontSize: 18,
    contained: {
      boxShadow: 'none',
      '&:active': {
        boxShadow: 200,
      },
    },
    backgroundColor: '#002855',
    "&:hover" : {
        backgroundColor : "rgb(107 33 168)"
    },
    containedPrimary: {
      backgroundColor: '#002855',
      color: "#FFFFF",
      '&:hover': {
        backgroundColor: '#d3d3d3',
        boxShadow: 'none',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: '#d3d3d3',
        },
      },
    },
    label: {
      textTransform: 'none',
      letterSpacing: '0.5px',
      fontWeight: 500,
    },
  });