import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { IconButton, Box, Popover, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import FileIcon from 'assets/images/icons/file.svg'
import { useNavigate } from "react-router-dom"
import network from 'helpers/network.helper';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ObjectItemCard = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let navigate = useNavigate()

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

              network.get(`/container/object/${props.hash}`, {
                url: `/container/object/${props.hash}`,
                method: 'GET',
                responseType: 'blob',
              }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', props.name); //or any other extension
                document.body.appendChild(link);
                link.click();
              });
            }}
          >
            <ListItemIcon>
              <DownloadIcon />
            </ListItemIcon>
            <ListItemText primary="Download" />
          </ListItemButton>
        </Box>
      </Popover>
    </>

  );
}

export default ObjectItemCard;