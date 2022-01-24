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

import { handleStaredState } from 'store/actions/object.actions'
import { useDispatch, useSelector } from "react-redux";

import RenameIcon from 'assets/images/icons/rename-icon.svg'
import { Typography } from '@mui/material';

const ProgressWrapper = styled(Box)(({ theme }) => ({
  paddingTop: '1px',
}));


const RenameObject = (props) => {

  const objectController = useSelector((state) => state.objects);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            disabled={loading}
            type="email"
            fullWidth
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>Cancel</Button>
          <Button disabled={loading} variant='contained' style={{ color: 'white' }} onClick={handleClose} size="small">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RenameObject;