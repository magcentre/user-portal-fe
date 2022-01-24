import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProfilePage from 'views/profile';
import TrashCan from 'views/trash'

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// file-browser component
const FileBrowser = Loadable(lazy(() => import('views/file-browser')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/file-browser',
            element: <FileBrowser />
        },
        {
            path: '/file-browser/folders/:folderHash',
            element: <FileBrowser />
        },
        {
            path: '/profile',
            element: <ProfilePage />
        },
        {
            path: '/trash',
            element: <TrashCan />
        },
        {
            path: '/recent-files',
            element: <FileBrowser mode='recent-files' key='recent-files' />
        },
        {
            path: '/starred-files',
            element: <FileBrowser mode='starred-files' key='starred-files' />
        }
    ]
};

export default MainRoutes;
