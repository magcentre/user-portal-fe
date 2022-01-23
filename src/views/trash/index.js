
import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrashObjects, clearTrashState } from 'store/actions/trash.actions'
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import InfoCard from './InfoCard';
import TrashCard from './TrashCard';


const CircularLoader = () => {
  return (
    <center>
      <CircularProgress />
    </center>
  )
}

const TrashCan = () => {

  const trashController = useSelector((state) => state.trash);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchTrashObjects());

    return () => {
      dispatch(clearTrashState());
    };

  }, [dispatch]);

  if (!trashController.trashElements) return (<CircularLoader />)

  if (trashController.trashElements && trashController.trashElements.length == 0) return (<>
    <InfoCard />
    <center> No files or folder found </center>
  </>)

  return (
    <>
      <InfoCard /><br />
      <Grid container spacing={2}>
        {trashController.trashElements.map((e) => {
          console.log(e);
          return (
            <Grid item key={e.id}>
              <TrashCard {...e} />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default TrashCan;
