import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { handleStaredState } from 'store/actions/object.actions'
import { useDispatch, useSelector } from "react-redux";
import RenameIcon from 'assets/images/icons/rename-icon.svg'


const RenameObject = (props) => {

  const objectController = useSelector((state) => state.objects);

  const dispatch = useDispatch();

  return (
    <ListItemButton
      onClick={() => {
        props.handelClose();
      }}
    >
      <ListItemIcon>
        <img src={RenameIcon} alt="rename-icon" />
      </ListItemIcon>
      <ListItemText primary="Rename" />
    </ListItemButton>
  )
}

export default RenameObject;