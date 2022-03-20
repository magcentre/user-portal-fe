import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// authentication
const InitAuthentication = Loadable(lazy(() => import('views/authentication')));
const Login = Loadable(lazy(() => import('views/login')));

// Subscription
const Subscription = Loadable(lazy(() => import('views/subscription')));


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
            element: <InitAuthentication />
        }
    ]
};

export default AuthenticationRoutes;
