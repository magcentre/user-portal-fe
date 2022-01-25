import * as React from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import { fetchStarredObjects, clearBrowserState } from 'store/actions/dashboard.actions'
import ObjectCard from 'views/file-browser/ObjectCard';
import DataTableObjectView from './TableView';

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

  const dashboardController = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchStarredObjects());
    return () => {
      dispatch(clearBrowserState());
    };
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {dashboardController.folderContent ? <DataTableObjectView rows={dashboardController.folderContent} /> : <StarredFileLoader />}
      </Grid>
    </>
  )
};

export default StarredFilesTable;