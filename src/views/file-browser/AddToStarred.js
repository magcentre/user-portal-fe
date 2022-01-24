import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import StarredIcon from 'assets/images/icons/add-to-starred.svg'


const AddToStarred = (props) => {

  return (
    <ListItemButton
      onClick={() => {
        props.handelClose();
      }}
    >
      <ListItemIcon>
        <img src={StarredIcon} alt="stared-icon" />
      </ListItemIcon>
      <ListItemText primary={(props.isStared ? "Remove from starred" : "Add to starred")} />
    </ListItemButton>
  )
}

export default AddToStarred;