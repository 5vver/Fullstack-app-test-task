// assets
import { TeamOutlined, ReadOutlined } from '@ant-design/icons';

// icons
const icons = {
  TeamOutlined,
  ReadOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-library',
  title: 'Library',
  type: 'group',
  children: [
    {
      id: 'authors',
      title: 'Authors',
      type: 'item',
      url: '/library/authors',
      icon: icons.TeamOutlined,
      breadcrumbs: false
    },
    {
      id: 'books',
      title: 'Books',
      type: 'item',
      url: '/library/books',
      icon: icons.ReadOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
