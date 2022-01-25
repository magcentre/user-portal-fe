import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentObjects, clearBrowserState } from 'store/actions/dashboard.actions'
import ObjectCard from 'views/file-browser/ObjectCard';
import DataTableObjectView from './TableView';

const RedentFileLoader = () => {
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

const FolderGrid = ({ objectList }) => {

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
        xs={12}
      >
        {objectList.map((e) => {
          return <Grid item>
            <ObjectCard {...e} />
          </Grid>
        })}
      </Grid>
    </>
  )
};

const RecentFilesTables = () => {

  const dashboardController = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRecentObjects());
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
        {dashboardController.folderContent ? <DataTableObjectView rows={dashboardController.folderContent} /> : <RedentFileLoader />}
      </Grid>
    </>
  )
};

export default RecentFilesTables;