// material-ui
import { CircularProgress, Grid } from '@mui/material';
import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import { fetchObjectForFolder, fetchRecentObjects, fetchStarredObjects, clearBrowserState } from 'store/actions/object.actions'
import { useParams } from 'react-router-dom';
import ObjectCard from './ObjectCard/';
import EmptyCard from './EmptyCard';

const CircularLoader = () => {
    return (
        <center>
            <CircularProgress />
        </center>
    )
}

const FileBrowser = ({ mode }) => {

    const objectController = useSelector((state) => state.objects);

    const userState = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const { folderHash } = useParams();

    const [folderContent, setFoldercontent] = useState(objectController.folderContent);

    useEffect(() => {

        switch (mode) {
            case 'recent-files':
                dispatch(fetchRecentObjects());
                break;
            case 'starred-files':
                dispatch(fetchStarredObjects());
                break;
            default:
                dispatch(fetchObjectForFolder(folderHash || 'myfiles'));
        }

        return () => {
            dispatch(clearBrowserState());
        }
    }, [dispatch, folderContent, folderHash]);

    if (!objectController.folderContent) return (<CircularLoader />)

    return (
        <>
            {objectController.folderContent.length === 0 && <EmptyCard />}
            <br />
            <Grid container spacing={2}>
                {objectController.folderContent.map((e) => {

                    if (e.user !== userState.user._id) {
                        return <></>;
                    }
                    return (
                        <Grid item key={e.id}>
                            <ObjectCard {...e} />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default FileBrowser;
