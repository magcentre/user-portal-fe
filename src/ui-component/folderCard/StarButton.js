import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { updateFolder } from 'store/actions/browser.action'
import { useDispatch, useSelector } from "react-redux";
import StarredIcon from 'assets/images/icons/add-to-starred.svg'


const AddToStarred = (props) => {

  useSelector((state) => state.objects);

  const dispatch = useDispatch();

  return (
    <ListItemButton
      onClick={() => {
        props.handelClose();
        dispatch(updateFolder(props.path, { isStared: !props.isStared } ));
      }}
    >
      <ListItemIcon>
        <img src={StarredIcon} alt="starred-icon" />
      </ListItemIcon>
      <ListItemText primary={(props.isStared ? "Remove from starred" : "Add to starred")} />
    </ListItemButton>
  )
}

export default AddToStarred;