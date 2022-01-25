import * as React from 'react'
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { initiateFileUpload } from 'store/actions/upload.actions'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';

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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {uploadController.files.length > 0 ? <FloatingCard sx={{  boxShadow: 5 }}>
        <CardActions style={{ padding: "10px", margin: 0, maxHeight: 200 }} >
          Uploading count
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Divider />
        <Collapse in={expanded} timeout="auto">
          <CardContent>
          </CardContent>
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