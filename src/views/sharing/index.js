// material-ui
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// project imports
import FolderSection from './FoldersSection';
import GreetingCard from './GreetingsCard';
import FileSharingTabView from './TabView';

// ==============================|| SAMPLE PAGE ||============================== //

const FileSharing = () => {

    return (<>
        <GreetingCard />
        {/* <FolderSection /> */}
        <FileSharingTabView />
        
    </>);
};

export default FileSharing;
