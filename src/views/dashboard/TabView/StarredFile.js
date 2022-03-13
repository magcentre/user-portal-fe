import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import DataTableObjectView from './TableView';
import { fetchStarredFiles } from 'store/actions/starred.actions';

const StarredFileLoader = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

const StarredFilesTable = () => {

  const controller = useSelector((state) => state.starred);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchStarredFiles());
  }, [dispatch]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {controller.content && controller.content.files.length > 0 ? <DataTableObjectView rows={[...controller.content.files]} /> : <StarredFileLoader />}
      </Grid>
    </>
  )
};

export default StarredFilesTable;