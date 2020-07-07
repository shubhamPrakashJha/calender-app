import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField, Box } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography align="center" variant="h4">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  buttons: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '8px',
      marginLeft: '0px',
    },
  },
  lastButton: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '8px',
    },
  },
}));

function CalenderDialogue({
  open,
  handleClickOpen,
  handleClose,
  title,
  description,
  handleTitleChange,
  handleDescriptionChange,
  handleUpdateEvent,
  handleDeleteEvent,
  eventMode,
}) {
   const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <Box p={2}>
          <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
          <DialogContent>
            <Box mb={2}>
              <TextField
                fullWidth
                id="outlined-multiline-title"
                label="Event Title"
                rowsMax={4}
                value={title}
                onChange={handleTitleChange}
                variant="outlined"
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="outlined-multiline-description"
                label="Event Description"
                rowsMax={4}
                value={description}
                onChange={handleDescriptionChange}
                variant="outlined"
              />
            </Box>
          </DialogContent>
          <DialogActions className={classes.buttonContainer}>
            <Box className={classes.buttons}>
              {eventMode === 'Edit' && (
                <Button
                  onClick={handleDeleteEvent}
                  variant="contained"
                  color="error"
                  className={classes.buttons}
                >
                  Delete
                </Button>
              )}
            </Box>
            <Box className={classes.buttons} style={{ marginLeft: '0px' }}>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="primary"
                className={clsx(classes.buttons)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateEvent}
                color="primary"
                variant="contained"
                className={clsx(classes.buttons, classes.lastButton)}
              >
                {`${eventMode} Event`}
              </Button>
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default CalenderDialogue;
