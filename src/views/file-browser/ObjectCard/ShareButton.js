import * as React from 'react';
import { styled } from '@mui/material/styles';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { updateObjectState } from 'store/actions/object.actions'
import { useDispatch, useSelector } from "react-redux";

import PeopleIcon from 'assets/images/icons/people.svg'
import { Typography } from '@mui/material';
import UserSearchBar from './AsyncSearch';

const ProgressWrapper = styled(Box)(({ theme }) => ({
  paddingTop: '1px',
}));


const ShareObject = (props) => {

  const objectController = useSelector((state) => state.objects);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState(props.name);

  const [error, setError] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateName = () => {
    if(name && name.length > 0) {
      dispatch(updateObjectState(props.hash, props.type, { name }));
      handleClose();
    } else {
      setError("Enter valid name");
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
          <img src={PeopleIcon} alt="rename-icon" />
        </ListItemIcon>
        <ListItemText primary="Manage People" />
      </ListItemButton>
      <Dialog open={open} onClose={handleClose}>
        {loading ?? <LinearProgress />}
        <DialogTitle>
          <Typography variant="h5" gutterBottom component="div">Share with People</Typography>
        </DialogTitle>
        <DialogContent>
          <UserSearchBar />
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

export default ShareObject;