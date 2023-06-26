// third-party
import { merge } from 'lodash';

// project import
import Badge from './Badge.jsx';
import Button from './Button.jsx';
import CardContent from './CardContent.jsx';
import Checkbox from './Checkbox.jsx';
import Chip from './Chip.jsx';
import IconButton from './IconButton.jsx';
import InputLabel from './InputLabel.jsx';
import LinearProgress from './LinearProgress.jsx';
import Link from './Link.jsx';
import ListItemIcon from './ListItemIcon.jsx';
import OutlinedInput from './OutlinedInput.jsx';
import Tab from './Tab.jsx';
import TableCell from './TableCell.jsx';
import Tabs from './Tabs.jsx';
import Typography from './Typography.jsx';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme) {
  return merge(
    Button(theme),
    Badge(theme),
    CardContent(),
    Checkbox(theme),
    Chip(theme),
    IconButton(theme),
    InputLabel(theme),
    LinearProgress(),
    Link(),
    ListItemIcon(),
    OutlinedInput(theme),
    Tab(theme),
    TableCell(theme),
    Tabs(),
    Typography()
  );
}
