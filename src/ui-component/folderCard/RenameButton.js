import * as React from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import LinearProgress from '@mui/material/LinearProgress';

import { useDispatch, useSelector } from "react-redux";

import RenameIcon from 'assets/images/icons/rename-icon.svg'
import { Typography } from '@mui/material';
import { folderRename } from 'store/actions/browser.action';


const RenameObject = (props) => {

  const controller = useSelector((state) => state.browser);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const loading = false;

  const [name, setName] = React.useState(props.name);

  const [error, setError] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateName = () => {
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (name && name.length > 0 && !format.test(name)) {
      dispatch(folderRename(props.path, name + '/', controller.pathKey));
      handleClose();
      return true;
    } else {
      setError("Enter valid name");
      return false;
    }
  };

  const handelOnChange = (e) => {
    setError(null);
    setName(e.target.value);
  }

  return (
    <>
      <ListItemButton
        onClick={() => {
          handleClickOpen();
        }}
      >
        <ListItemIcon>
          <img src={RenameIcon} alt="rename-icon" />
        </ListItemIcon>
        <ListItemText primary="Rename" />
      </ListItemButton>
      <Dialog open={open} onClose={handleClose} maxWidth={"xs"}>
        {loading ?? <LinearProgress />}
        <DialogTitle>
          <Typography variant="h3" gutterBottom component="div">Rename</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            defaultValue={props.name}
            margin="dense"
            id="name"
            label="Name"
            error={error}
            helperText={error}
            disabled={loading}
            onChange={handelOnChange}
            type="email"
            fullWidth
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>Cancel</Button>
          <Button onClick={updateName} disabled={loading} variant='contained' style={{ color: 'white' }} size="small">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RenameObject;