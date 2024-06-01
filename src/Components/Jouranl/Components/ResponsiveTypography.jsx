import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    typography: {
        marginLeft: 5,
        [theme.breakpoints.up("xs")]: {
            fontSize: "50%",
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: "75%",
        },
        [theme.breakpoints.up("md")]: {
            fontSize: "100%",
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: "125%",
        },
        [theme.breakpoints.up("xl")]: {
            fontSize: "150%",
        },
    },
}));

const ResponsiveTypography = () => {
    const classes = useStyles();

    return <Typography className={classes.typography}>Interactions</Typography>;
};

export default ResponsiveTypography;
