import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Home = Loadable(lazy(() => import('pages/Home')));
const CropMaster = Loadable(lazy(() => import('pages/crop-master/CropMasterIndex')));
const Plot = Loadable(lazy(() => import('pages/plot/Plot')));
const Party = Loadable(lazy(() => import('pages/party/Party')));
const Purchase = Loadable(lazy(() => import('pages/purchase/Purchase')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

const NotFound = () => <h1>NotFound</h1>;

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = (isAuthenticated) => ({
    path: '/',
    element: isAuthenticated ? <MainLayout /> : <Navigate to="/login" />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/home',
            element: <Home />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },

        {
            path: 'crop-master',
            element: <CropMaster />
        },
        {
            path: 'plot',
            element: <Plot />
        },
        {
            path: 'party',
            element: <Party />
        },
        {
            path: 'purchase',
            element: <Purchase />
        },

        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
});

export default MainRoutes;
