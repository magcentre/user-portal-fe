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

import { updateSharingDetails, getShareDetails } from 'store/actions/object.actions'
import { useDispatch, useSelector } from "react-redux";

import PeopleIcon from 'assets/images/icons/people.svg'
import { Typography } from '@mui/material';
import UserSearchBar from './AsyncSearch';

const ProgressWrapper = styled(Box)(({ theme }) => ({
  paddingTop: '1px',
}));


const ShareObject = (props) => {

  const objectController = useSelector((state) => state.objects);

  const [shareDetails, setShareDetails] = React.useState();

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateShareStatus = () => {
    const sharedWith = [];
      value.forEach((v, n) => sharedWith.push(v._id));
      dispatch(updateSharingDetails(props.hash, props.type, { sharedWith }));
      
      handleClose();
  };

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
        <DialogTitle>
          <Typography variant="h5" gutterBottom component="div">Share with People</Typography>
        </DialogTitle>
        <DialogContent>
          <UserSearchBar {...props} value={value} setValue={setValue} shareDetails={shareDetails} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateShareStatus} variant='contained' style={{ color: 'white' }} size="small">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ShareObject;