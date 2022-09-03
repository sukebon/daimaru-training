import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { NextPage } from 'next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { subCategoriesState } from '../../store';

type Props = {
  category: { id: string; name: string };
};

const SidebarList: NextPage<Props> = ({ category }) => {
  const subCategories = useRecoilValue(subCategoriesState); // サブカテゴリー一覧
  const [filterSubCategories, setFilterSubCategories] = React.useState([]); // 絞り込みをしたサブカテゴリー一覧
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const newArray = subCategories.filter(
      (subCategory: { id: string; parentId: string }) => {
        if (category.id === subCategory.parentId) return subCategory;
      }
    );
    setFilterSubCategories(newArray);
  }, [category, subCategories]);

  return (
    <div key={category.id}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={category.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {filterSubCategories.map((page: { id: string; name: string }) => (
            <ListItemButton key={page.id} sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </div>
  );
};

export default SidebarList;
