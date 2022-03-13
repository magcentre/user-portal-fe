import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import StarredIcon from 'assets/images/icons/add-to-starred.svg'
import { updateFile } from 'store/actions/browser.action';


const AddToStarred = (props) => {

  useSelector((state) => state.objects);

  const dispatch = useDispatch();

  return (
    <ListItemButton
      onClick={() => {
        props.handelClose();
        dispatch(updateFile(props.hash, { isStared: !props.isStared } ));
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