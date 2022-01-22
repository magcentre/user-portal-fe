// material-ui
import { CircularProgress, Grid, Typography } from '@mui/material';
import netwotk from 'helpers/network.helper';
import { useEffect, useState, useContext, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FOLDER_CONTENT } from 'store/actions';
import InfoCard from './InfoCard';
import TrashCard from './TrashCard';
import { useSnackbar } from 'notistack';

const CircularLoader = () => {
  return (
    <center>
      <CircularProgress />
    </center>
  )
}


const TrashCan = () => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [trashContent, setTrashContent ] = useState();

  const updateDelete = () => {
    netwotk.get(`/container/trash/`)
      .then((e) => {
        setTrashContent(e.data.data);
      })
      .catch((e) => {
        enqueueSnackbar("Failed to load trash");
      })
  };

  useEffect(() => {
    updateDelete();
  },[]);

  if (!trashContent) return (<CircularLoader />)

  if (trashContent && trashContent.length == 0) return (<>
      <center> No files or folder found </center>
    </>)

  return (
    <>
      <InfoCard />
      <Grid container spacing={2}>
        {trashContent.map((e) => {
          return (
            <Grid item key={e.id}>

              <TrashCard updateDelete={updateDelete} {...e} />
            </Grid>

          )
        })}
      </Grid>
    </>
  )
}

export default TrashCan;
