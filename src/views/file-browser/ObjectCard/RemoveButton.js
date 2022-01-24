import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { handleStaredState } from 'store/actions/object.actions'
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from 'assets/images/icons/add-to-starred.svg'


const RemoveButton = (props) => {

  useSelector((state) => state.objects);

  const dispatch = useDispatch();

  return (
    <>
      <ListItemButton
        onClick={() => {
          // network.delete(`/container/object/${props.hash}`).then((e) => {

          //   const action = key => (
          //     <>
          //       <Button onClick={() => {
          //         network.patch(`/container/object/${props.hash}`, { isTrash: false }).then((e) => {
          //           dispatch({ type: ADD_NEW_OBJECT, object: e.data.data });
          //           closeSnackbar();
          //         })
          //       }}>
          //         undo
          //       </Button>
          //     </>
          //   );

          //   enqueueSnackbar("File moved to trash", {
          //     action,
          //   });

          //   handleClose();

          //   const unDeletedData = [];

          //   objectController.folderContent.forEach((e) => {

          //     if (e.hash !== props.hash) {
          //       unDeletedData.push(e);
          //     }
          //   })

          //   dispatch({ type: DELETE_OBJECT, folderContent: unDeletedData });

          // });

        }}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Remove" />
      </ListItemButton>

    </>

  )
}

export default RemoveButton;