import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import Register from 'views/registration';
import Subscription from 'views/subscription';


// login option 3 routing
const Login = Loadable(lazy(() => import('views/authentication')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/subscription',
            element: <Subscription />
        },
        {
            path: '/register',
            element: <Register />
        }
    ]
};

export default AuthenticationRoutes;
