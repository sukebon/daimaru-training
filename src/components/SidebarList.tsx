import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useRecoilState, useRecoilValue } from "recoil";
import { drawerState, postsState } from "../../store";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArticleIcon from "@mui/icons-material/Article";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type Props = {
  category: {
    id: string;
    categoryName: string;
  };
};

const SidebarList: NextPage<Props> = ({ category }) => {
  const router = useRouter();
  const queryId = router.query.id;
  const posts = useRecoilValue(postsState); // 記事一覧
  const [filterPosts, setFilterPosts] = React.useState([]); // 絞り込みをした記事一覧

  const [darawerOpen, setDrawerOpen] = useRecoilState(drawerState);
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const handleClick = () => {
    setCategoryOpen(!categoryOpen);
  };

  React.useEffect(() => {
    const newArray = posts.filter((post: { id: string; category: any }) => {
      if (category.id === post.category.id) return post;
    });
    setFilterPosts(newArray);
  }, [posts, category.id]);

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary={category.categoryName} />
        {categoryOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {filterPosts.map((post: { id: string; title: string }) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <a>
                <ListItemButton
                  sx={{
                    pl: 4,
                    bgcolor: post.id === queryId ? "#f4f4f4" : "",
                  }}
                  onClick={() => {
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={post.title} />
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
