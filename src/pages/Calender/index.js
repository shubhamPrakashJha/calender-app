import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Calender = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <h1>Calender</h1>
      </div>
    </div>
  );
};

export default Calender;
