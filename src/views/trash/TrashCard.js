import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { IconButton, Box, Popover, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileIcon from 'assets/images/icons/file.svg'
import network from 'helpers/network.helper';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_OBJECT } from 'store/actions/object.actions';
import TrashIcon from 'assets/images/icons/trash-icon.svg'
import TrashRestore from 'assets/images/icons/trash-restore.svg'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TrashCard = (props) => {


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
          <ListItemButton
            onClick={() => {
              network.patch(`/container/object/${props.hash}`, { isTrash: false }).then((e) => {
                props.updateDelete();
                enqueueSnackbar("File restored forever");
              });
            }}
          >
            <ListItemIcon>
              <img src={TrashRestore} />
            </ListItemIcon>
            <ListItemText primary="Restore" />
          </ListItemButton>
          <Divider />
          <ListItemButton
            onClick={() => {

              network.delete(`/container/trash/${props.hash}`).then((e) => {

                props.updateDelete();

                enqueueSnackbar("File deleted forever");

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
              <img src={TrashIcon} />
            </ListItemIcon>
            <ListItemText primary="Delete forever" />
          </ListItemButton>
        </Box>
      </Popover>
    </>

  );
}

export default TrashCard;