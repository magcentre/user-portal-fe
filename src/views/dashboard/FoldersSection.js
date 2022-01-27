import * as React from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import { fetchObjectForFolder, clearBrowserState } from 'store/actions/object.actions'
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

  const userState = useSelector((state) => state.user);

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

          if (e.type || e.user !== userState.user._id) return <></>
          return <Grid item>
            <ObjectCard {...e} />
          </Grid>
        })}
      </Grid>
    </>
  )

};

const FolderSection = () => {

  const dashboardController = useSelector((state) => state.objects);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchObjectForFolder('myfiles'));

    return () => {
      dispatch(clearBrowserState());
    };
  }, []);

  return (
    <>
      <Typography gutterBottom color="primary" component="h3" style={{ fontSize: 18, marginTop: "15px", fontWeight: 'bold', margin: "8px" }}>
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