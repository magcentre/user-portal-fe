import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "store/actions/browser.action";
import NoFileUploaded from 'assets/images/icons/no_file_uploaded.svg'
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import GreetingCard from "ui-component/GreetingCard";
import FileCard from "ui-component/fileCard";
import FolderCard from "ui-component/folderCard";

const EmptyCard = () => {

  return (
    <>
      <center style={{ top: "30%", left: "40%", position: 'fixed' }}>
        <img src={NoFileUploaded} height="350" alt="no-file-upload" /><br />
        No files are uploaded, please start uploading files
      </center>
    </>
  )
}

const Loader = () => {

  return (
    <>
      <center style={{ top: "50%", left: "50%", position: 'fixed' }}>
        <CircularProgress />
      </center>

    </>
  )
}

const Browser = ({ path }) => {

  const controller = useSelector((state) => state.browser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContent(path));
  }, [dispatch, path]);

  if (!controller.content) {
    return <Loader />
  }

  if (controller.content.dir.length === 0 && controller.content.files.length === 0) {
    return <EmptyCard />;
  }

  return (
    <>
      <GreetingCard />
      <br />
      <Grid container spacing={2}>

        {controller.content.dir.map((e) => {
          console.log(e);
          return (
            <Grid item key={e.id}>
              <FolderCard {...e} path={e.key} />
            </Grid>
          )
        })}

        {controller.content.files.map((e) => {
          return (
            <Grid item key={e.prefix}>
              <FileCard {...e} />
            </Grid>
          )
        })}

      </Grid>
    </>
  )
}

export default Browser;