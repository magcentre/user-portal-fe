import React from 'react';
import { Avatar, Typography, Fab, CircularProgress, Stack, Item } from '@mui/material';
import { IconPlus } from '@tabler/icons';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import uploadNetwork from 'helpers/upload.helper';
import { ADD_NEW_OBJECT, SET_FOLDER_CONTENT } from 'store/types/object.types';

const Input = styled('input')({
  display: 'none',
});

const AddNewButton = () => {

  const theme = useTheme();

  const objectController = useSelector((state) => state.objects);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState();

  const [error, setError] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateName = () => {
    // if (name && name.length > 0) {
    //   dispatch(updateObjectState(props.hash, props.type, { name }));
    //   handleClose();
    // } else {
    //   setError("Enter valid name");
    // }

  };

  const handelOnChange = (e) => {
    setError(null);
    setName(e.target.value);
  }



  return (
    <>

      <Fab variant="extended"
        color="white"
        component="label"
        onClick={() => {
          handleClickOpen();
        }}
        sx={{
          backgroundColor: 'inherit',
          py: 1.25,
          mt: 2,
          width: '100%'
        }} >
        <Avatar sx={{ bgcolor: theme.palette.secondary.dark, height: 30, width: 30 }} >
          <IconPlus sx={{ mr: 1 }} color='white' size={30} />
        </Avatar>
        <Typography sx={{ ml: 1 }} variant="h4" color="inherit" >
          Add New
        </Typography>
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth={"xs"}>
        <DialogTitle>
          <Typography variant="h3" gutterBottom component="center">Create New</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
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
  );
}

export default AddNewButton;