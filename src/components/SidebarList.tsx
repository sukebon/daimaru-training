import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { NextPage } from 'next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { subCategoriesState } from '../../store';
import Link from 'next/link';

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
      (subCategory: { id: string; categoryId: string }) => {
        if (category.id === subCategory.categoryId) return subCategory;
      }
    );
    setFilterSubCategories(newArray);
  }, [category, subCategories]);

  return (
    <div key={category.id}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary={category.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {filterSubCategories.map((page: { id: string; name: string }) => (
            <Link key={page.id} href={`/category/${page.id}`}>
              <a>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </a>
            </Link>
          ))}
        </List>
      </Collapse>
    </div>
  );
};

export default SidebarList;
