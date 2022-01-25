// material-ui
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// project imports
import FolderSection from './FoldersSection';
import GreetingCard from './GreetingsCard';

// ==============================|| SAMPLE PAGE ||============================== //

const DashboardPage = () => {

    

    return (<>
        <GreetingCard />
        <FolderSection />
        
    </>);
};

export default DashboardPage;
