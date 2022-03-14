import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Chip,
} from '@mui/material';

import User1 from 'assets/images/users/user-round.svg';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const userState = useSelector((state) => state.user);
    let navigate = useNavigate()

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    color: 'black'
                }}
                icon={
                    <Avatar
                        src={User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}

                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={`${userState.user.firstName} ${userState.user.lastName}`}
                onClick={() => {
                    navigate("/profile");
                }}
                variant="outlined"
                color="primary"
            />
        </>
    );
};

export default ProfileSection;
