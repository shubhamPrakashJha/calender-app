import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: theme.palette.background.dark,
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
  }},
}));

export default function AppLayout({ children }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState('Home');
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <>
      <CssBaseline />
      <Navbar
        isDrawerOpen={open}
        handleDrawerToggle={handleDrawerToggle}
        tab={currentTab}
      />
      <div className={classes.root}>
        <Sidebar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          changeTab={handleCurrentTab}
          tab={currentTab}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </>
  );
}
