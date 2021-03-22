import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {},
  flexGrow: {
    flexGrow: 1,
  },
  brand: {
    color: "white",
  },
  barContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "white",
  },
}));

const Topbar = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <>
      <AppBar {...rest} className={clsx(classes.root, className)}>
        <Toolbar>
          <RouterLink to='/'>
            <div className={classes.barContainer}>
              <DashboardIcon />
              <Typography variant='h3' className={classes.brand}>
                Brandlift Dashboard
              </Typography>
            </div>
          </RouterLink>
          <div className={classes.flexGrow} />
          <a href='/'>
            <Typography variant='h5' className={classes.brand}>
              HOME
            </Typography>
          </a>
        </Toolbar>
      </AppBar>
    </>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
