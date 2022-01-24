import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { IconButton, Box, Popover, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from 'assets/images/icons/file.svg'
import network from 'helpers/network.helper';
import config from 'config'
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_OBJECT, ADD_NEW_OBJECT } from 'store/types/object.types';
import AddToStarred from './StarButton';
import RenameObject from './RenameButton';
import RemoveButton from './RemoveButton';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ObjectCard = (props) => {


  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const objectController = useSelector((state) => state.objects);

  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? `details-popover-${props.id}` : undefined;

  const dateWithoutTime = new Date(props.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

  const dateWithTime = new Date(props.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: '2-digit', minute: 'numeric' });

  return (
    <>
      <Card sx={{ width: 200, height: 160 }} >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Item>
            <img src={FileIcon} height="50" width="50" />
          </Item>
          <Item>
            <IconButton aria-label="settings" aria-describedby={id} onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Item>
        </Stack>

        <CardContent sx={{ padding: 1 }}>
          <Box component="div" sx={{ md: 1, overflow: 'hidden', fontWeight: 'bold', height: '2.6em' }}>
            {props.name}
          </Box>
          <Box sx={{ mt: 1 }} component='div'>
            {dateWithoutTime}
          </Box>

        </CardContent>
      </Card>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}

      >
        <Box sx={{ width: 300 }}>
          <ListItemButton dense="true">
            <ListItemIcon>
              <img src={FileIcon} height="30" width="30" />
            </ListItemIcon>
            <ListItemText primary={props.name} secondary={dateWithTime} />
          </ListItemButton>
          <Divider />
          {props.type ? (<ListItemButton
            onClick={() => {
              window.open(`${config.apiEnd}/container/object/${props.hash}`);
            }}
          >
            <ListItemIcon>
              <DownloadIcon />
            </ListItemIcon>
            <ListItemText primary="Download" />
          </ListItemButton>) : <></>}
          <Divider />
          <ListItemButton
            onClick={() => {
              network.delete(`/container/object/${props.hash}`).then((e) => {

                const action = key => (
                  <>
                    <Button onClick={() => {
                      network.patch(`/container/object/${props.hash}`, { isTrash: false }).then((e) => {
                        dispatch({ type: ADD_NEW_OBJECT, object: e.data.data });
                        closeSnackbar();
                      })
                    }}>
                      undo
                    </Button>
                  </>
                );

                enqueueSnackbar("File moved to trash", {
                  action,
                });

                handleClose();

                const unDeletedData = [];

                objectController.folderContent.forEach((e) => {

                  if (e.hash !== props.hash) {
                    unDeletedData.push(e);
                  }
                })

                dispatch({ type: DELETE_OBJECT, folderContent: unDeletedData });

              });

            }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </ListItemButton>
          
          <Divider />
          <AddToStarred {...props} handelClose={handleClose} />
          <Divider />
          <RenameObject {...props} handelClose={handleClose} />
        </Box>
      </Popover>
    </>

  );
}

export default ObjectCard;