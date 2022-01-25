import * as React from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import { fetchFolders } from 'store/actions/dashboard.actions'
import ObjectCard from 'views/file-browser/ObjectCard';

const FolderLoader = () => {
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
          if(e.type) return <></>
          return <Grid item>
            <ObjectCard {...e} />
          </Grid>
        })}
      </Grid>
    </>
  )

};

const FolderSection = () => {

  let dispatch = useDispatch();

  let dashboardController = useSelector((state) => state.dashboard);

  React.useEffect(() => {
    dispatch(fetchFolders('myfiles'));
  }, []);

  return (
    <>
      <Typography gutterBottom color="primary" component="div" style={{ marginTop: "15px", fontWeight: 'bold', margin: "8px" }}>
        Folders
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {dashboardController.folderContent ? <FolderGrid objectList={dashboardController.folderContent} /> : <FolderLoader />}
      </Grid>
    </>
  )
};

export default FolderSection;