import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Typography } from '@mui/material';

export default function Sidebar() {
  const pages = [
    'セクシャルハラスメント',
    'パワーハラスメント',
    'マタニティハラスメント',
    'パタニティハラスメント',
    '時短ハラスメント',
    'ジェンダーハラスメント',
    'ケアハラスメント',
  ];
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        minHeight: '100vh',
        bgcolor: 'background.paper',
        flexGrow: 0,
        display: { xs: 'none', md: 'block' },
        boxShadow: '1px 1px 8px rgb(0 0 0 / 14%)',
      }}
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader
          component='div'
          id='nested-list-subheader'
          sx={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.25rem',
            fontWeight: 'bold',
          }}
        >
          大丸白衣 研修サイト
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary='セクハラの定義' />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary='ハラスメントの種類' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {pages.map((page) => (
            <ListItemButton key={page} sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={page} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
