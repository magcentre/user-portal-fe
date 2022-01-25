// material-ui
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// project imports
import FolderSection from './FoldersSection';
import GreetingCard from './GreetingsCard';
import DashboardTabs from './TabView';

// ==============================|| SAMPLE PAGE ||============================== //

const DashboardPage = () => {

    

    return (<>
        <GreetingCard />
        <FolderSection />
        <DashboardTabs />
        
    </>);
};

export default DashboardPage;
