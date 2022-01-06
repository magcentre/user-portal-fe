import { useState } from 'react';
import { Avatar, Typography, Fab, CircularProgress, Stack, Item } from '@mui/material';
import { IconPlus } from '@tabler/icons';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import uploadNetwork from 'helpers/upload.helper';
import { ADD_NEW_OBJECT, SET_FOLDER_CONTENT } from 'store/actions';

const Input = styled('input')({
  display: 'none',
});

const AddNewButton = () => {

  const theme = useTheme();

  const customization = useSelector((state) => state.customization);

  const objectController = useSelector((state) => state.objects);

  const [isUploading, setUploading] = useState(false);

  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();


  const uploadFileToContainer = (e) => {

    const dataArray = new FormData();

    dataArray.append("file", e.target.files[0]);

    const config = {
      onUploadProgress: progressEvent => {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        console.log("onUploadProgress", totalLength);
        if (totalLength !== null) {
          setProgress(Math.round((progressEvent.loaded * 100) / totalLength));
        }
      }
    }
    setUploading(true);
    uploadNetwork.post(`/container/object/upload/${objectController.folderHash}`, dataArray, config).then((e) => {
      setUploading(false);
      setProgress(0);
      dispatch({ type: ADD_NEW_OBJECT, object: e.data.data })
    });

  };

  return (
    <>

      <Fab variant="extended"
        color="white"
        component="label"
        disabled={isUploading}
        sx={{
          borderRadius: `${customization.borderRadius}px`,
          backgroundColor: 'inherit',
          py: 1.25,
          mt: 2,

          width: '100%'
        }} >

        {isUploading ? <div sx={{ m: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}>
            <>
              <div>
                <CircularProgress sx={{ p: 0.7, mt: 0.8 }} value={progress} />
              </div>

            </>
            <>
              <div style={{ marginRight: '10px', fontSize: "20px", fontWeight: 'bold' }}>
                {progress} %
              </div>

            </>
          </Stack>

        </div> : <>
          <Input id="contained-button-file" multiple type="file" onChange={uploadFileToContainer} visible={false} />
          <Avatar sx={{ bgcolor: theme.palette.secondary.dark, height: 30, width: 30 }} >
            <IconPlus sx={{ mr: 1 }} color='white' size={30} />
          </Avatar>
          <Typography sx={{ ml: 1 }} variant="h4" color="inherit">
            Add New
          </Typography>
        </>
        }


      </Fab>
    </>
  );
}

export default AddNewButton;