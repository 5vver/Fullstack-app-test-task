import { lazy } from 'react';

// project import
import Loadable from '@components/Loadable';
import MainLayout from '@src/layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('@src/pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('@src/pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('@src/pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('@src/pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('@src/pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('@src/pages/components-overview/AntIcons')));

// render - library
const Authors = Loadable(lazy(() => import('@src/pages/library/Authors')))
const Books = Loadable(lazy(() => import('@src/pages/library/Books')))

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
      path: 'library',
      children: [
        {
          path: 'authors',
          element: <Authors />
        },
        {
          path: 'books',
          element: <Books />
        },
      ]
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
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
    }
  ]
};

export default MainRoutes;
