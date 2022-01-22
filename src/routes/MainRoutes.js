import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProfilePage from 'views/profile';
import TrashCan from 'views/trash'

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));


// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const MyFiles = Loadable(lazy(() => import('views/myfiles')));

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
            path: '/my-files',
            element: <MyFiles />
        },
        {
            path: '/my-files/folders/:key',
            element: <MyFiles />
        },
        {
            path: '/profile',
            element: <ProfilePage />
        },
        {
            path: '/trash',
            element: <TrashCan />
        }
    ]
};

export default MainRoutes;
