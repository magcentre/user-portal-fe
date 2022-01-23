// material-ui
import { CircularProgress, Grid, Typography } from '@mui/material';
import netwotk from 'helpers/network.helper';
import { useEffect, useState, useContext, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FOLDER_CONTENT } from 'store/actions/object.actions';
import { useSnackbar } from 'notistack';
import FileCard from './FileCard';
import EmptyCard from './EmptyCard';


const CircularLoader = () => {
    return (
        <center>
            <CircularProgress />
        </center>
    )
}


const MyFiles = () => {

    const objectController = useSelector((state) => state.objects);

    const dispatch = useDispatch();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [folderContent, setFoldercontent] = useState(objectController.folderContent);

    useEffect(() => {
        netwotk.get(`/container/folder/${objectController.folderHash}`).then((e) => {
            dispatch({ type: SET_FOLDER_CONTENT, folderContent: e.data.data });
        }).catch((e) => {
            enqueueSnackbar("Failed to load folder details");
        });
    }, [dispatch, folderContent]);

    if (!objectController.folderContent) return (<CircularLoader />)

    return (
        <>
            { objectController.folderContent.length === 0 && <EmptyCard /> }
            <br />
            <Grid container spacing={2}>
                {objectController.folderContent.map((e) => {
                    return (
                        <Grid item key={e.id}>
                            <FileCard {...e} />
                        </Grid>

                    )
                })}
            </Grid>
        </>
    )
}

export default MyFiles;
