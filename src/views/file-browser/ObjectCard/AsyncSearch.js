import React from 'react';
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip";
import network from 'helpers/network.helper';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import { container } from 'constants/api.constants';
import { ListItemButton } from '@mui/material';

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export default function UserSearchBar() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState();
  const loading = open && options.length === 0;

  const onChangeHandle = async value => {
    // use the changed value to make request and then use the result. Which
    console.log(value);
    const userResponse = await network.get(`${container.search}q=${value}`);
    setOptions(userResponse.data.data);
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
       setValue({
         ...newValue
       })
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      options={options}
      loading={loading}
      renderOption={(props, option, state) => {
        console.log(props, option, state);
        return (
          <ListItemButton selected={state.selected} dense selec>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${option.firstName} ${option.lastName}`}
              secondary={`${option.email}`}
            />
          </ListItemButton>
        )
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.title}
            size="small"
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={params => (
        <TextField
          {...params}
          label="Search Users"
          variant="filled"
          onChange={ev => {
            if (ev.target.value !== "" || ev.target.value !== null) {
              onChangeHandle(ev.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}