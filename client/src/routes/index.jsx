import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes.jsx';
import MainRoutes from './MainRoutes.jsx';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, LoginRoutes]);
}
