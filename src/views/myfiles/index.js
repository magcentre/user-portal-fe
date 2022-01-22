// material-ui
import { CircularProgress, Grid, Typography } from '@mui/material';
import netwotk from 'helpers/network.helper';
import { useEffect, useState, useContext, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FOLDER_CONTENT } from 'store/actions';
import { useSnackbar } from 'notistack';
import ObjectItemCard from 'ui-component/cards/ObjectItemCard';


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

    if (objectController.folderContent.length === 0) return (<CircularLoader />)

    return (
        <>
            <br />
            <Grid container spacing={2}>
                {objectController.folderContent.map((e) => {
                    return (
                        <Grid item key={e.id}>
                            <ObjectItemCard {...e} />
                        </Grid>

                    )
                })}
            </Grid>
        </>
    )
}

export default MyFiles;
