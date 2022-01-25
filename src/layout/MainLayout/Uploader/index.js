import * as React from 'react'
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { initiateFileUpload } from 'store/actions/upload.actions'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { getIconFromType } from 'utils/object-icon';
import uploadNetwork from 'helpers/upload.helper';
import apiConstants from 'constants/api.constants';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FloatingCard = styled(Card)(({ theme }) => ({
  boxShadow: 5, padding: 0, margin: 0, width: 300, maxHeight: 250, position: 'fixed', right: 50, bottom: 50, zIndex: 999
}));


const UploadItem = (props) => {

  return (
    <>
      <Divider />
      <ListItem
        dense
        secondaryAction={
          <Box sx={{ position: 'relative', paddingTop: "5px" }}>
            <CircularProgress
              variant="determinate"
              sx={{
                color: (theme) =>
                  theme.palette.grey[300],
              }}
              size={20}
              thickness={7}
              {...props}
              value={100}
            />
            <CircularProgress
              variant="determinate"
              disableShrink
              sx={{
                color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                animationDuration: '550ms',
                position: 'absolute',
                left: 0,
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
              }}
              size={20}
              value={props.progress}
              thickness={7}
              {...props}
            />
          </Box>
        }
      >
        <ListItemAvatar>
          <img src={getIconFromType(props.file.type)} height="20" width="20" alt="loader-icon" />
        </ListItemAvatar>
        <ListItemText
          primary={props.file.name}
          primaryTypographyProps={{
            variant: 'subtitle2',
            style: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }}
        />
      </ListItem>
    </>
  )
}

const UploadController = (props) => {

  const objectController = useSelector((state) => state.objects);

  const uploadController = useSelector((state) => state.upload);

  const dispatch = useDispatch();

  const onDrop = React.useCallback(acceptedFiles => {
    dispatch(initiateFileUpload(acceptedFiles, objectController.folderHash));
  }, []);

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    noClick: true,
  });

  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {Object.keys(uploadController.uploads).length > 0 ? <FloatingCard sx={{ boxShadow: 5 }}>
        <CardActions style={{ padding: "5px", margin: 0, maxHeight: 200 }} >
          Uploading
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon fontSize="small" />
          </ExpandMore>
          <IconButton  >
            <CloseIcon fontSize="small" />
          </IconButton>
        </CardActions>
        <Divider />
        <Collapse in={expanded} style={{ overflow: 'scroll' }} timeout="auto">
          {Object.values(uploadController.uploads).map((e, i) => {
            return <UploadItem {...e} />
          })}
        </Collapse>
      </FloatingCard> : <></>}
      <section>
        <div {...getRootProps({})}>
          <input {...getInputProps()} />
          {props.outlet}
        </div>
      </section>

    </>
  )
}

export default UploadController;