import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  activeSidebarItemState,
  drawerState,
  subCategoriesState,
} from '../../store';
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

type Props = {
  category: { id: string; name: string };
};

const SidebarList: NextPage<Props> = ({ category }) => {
  const router = useRouter();
  const subCategories = useRecoilValue(subCategoriesState); // サブカテゴリー一覧
  const [filterSubCategories, setFilterSubCategories] = React.useState([]); // 絞り込みをしたサブカテゴリー一覧
  const [activeSidebarItem, setActiveSidebarItem] = useRecoilState(
    activeSidebarItemState
  );
  const [darawerOpen, setDrawerOpen] = useRecoilState(drawerState);
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const handleClick = () => {
    setCategoryOpen(!categoryOpen);
    setActiveSidebarItem('');
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
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary={category.name} />
        {categoryOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={categoryOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {filterSubCategories.map((page: { id: string; name: string }) => (
            <Link key={page.id} href={`/category/${page.id}`}>
              <a>
                <ListItemButton
                  sx={{
                    pl: 4,
                    bgcolor:
                      page.id === activeSidebarItem &&
                      (router.pathname.includes('category') ||
                        router.pathname.includes('posts'))
                        ? '#f4f4f4'
                        : '',
                  }}
                  onClick={() => {
                    setActiveSidebarItem(page.id);
                    setDrawerOpen(false);
                  }}
                >
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
    </>
  );
};

export default SidebarList;
