import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import {
  categoriesState,
  postsState,
  subCategoriesState,
} from '../../../store';
import CategoryAddModal from '../../components/CategoryAddModal';
import Link from 'next/link';
import CategoryMenu from '../../components/CategoryMenu';

import CategoryPost from '../../components/CategoryPost';

type categoriesState = {
  id: string;
  name: string;
}[];

const EditTags = () => {
  const [categoryId, setCategoryId] = useState(''); // カテゴリーのID;
  const [subCategoryId, setSubCategoryId] = useState(''); // サブカテゴリーのID;
  const categories = useRecoilValue<categoriesState>(categoriesState); // カテゴリー一覧
  const subCategories = useRecoilValue(subCategoriesState); // サブカテゴリー一覧
  const posts = useRecoilValue(postsState); // 記事一覧
  const [filterSubCategories, setFilterSubCategories] = useState<any>([]); // 絞り込みをしたサブカテゴリー一覧
  const [filterPosts, setFilterPosts] = useState<any>([]); // 絞り込みをした記事一覧

  // 記事リストの初期値
  useEffect(() => {
    let id = categoryId || (categories && categories[0] && categories[0].id);

    const newPostArray: any = posts.filter(
      (post: { id: string; categoryId: string }) => {
        if (post.categoryId === id) return post;
      }
    );
    setFilterPosts(newPostArray);
    const result = categories[0] ? categories[0].id : '未分類';
    if (!categoryId) setCategoryId(result);
  }, [posts, categories, categoryId]);

  const handleCategoryChecked = (id: string) => {
    setCategoryId(id);
  };

  return (
    <>
      <Container maxWidth='lg'>
        <Box component='h1' mt={6} sx={{ fontSize: '1.2rem' }}>
          カテゴリー作成
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={0}
            border='1px solid #e1e1e1'
            bgcolor='white'
          >
            <Grid item xs={4} borderRight='1px solid #e1e1e1'>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                p={2}
                bgcolor='white'
                borderBottom='1px solid #f4f4f4'
              >
                カテゴリー
                {categories.length !== 0 && (
                  <CategoryMenu categoryId={categoryId} />
                )}
              </Box>
              <Box>
                <CategoryAddModal />
              </Box>
              <Box component='ul' p={0}>
                {categories.map(
                  (category: { id: string; name: string }, index: number) => (
                    <Box
                      key={index}
                      component='li'
                      sx={style}
                      bgcolor={categoryId === category.id ? '#f4f4f4' : ''}
                      onClick={() => handleCategoryChecked(category.id)}
                    >
                      {category.name}
                    </Box>
                  )
                )}

                <Box
                  component='li'
                  sx={style}
                  bgcolor={categoryId === '未分類' ? '#f4f4f4' : ''}
                  onClick={() => handleCategoryChecked('未分類')}
                >
                  {'未分類'}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={8}>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                p={2}
                bgcolor='white'
                borderBottom='1px solid #f4f4f4'
              >
                記事一覧
              </Box>
              <Box>
                <Link href={'post-new'}>
                  <a>
                    <Typography
                      p={2}
                      display='flex'
                      alignItems='center'
                      color='primary'
                      sx={{ cursor: 'pointer' }}
                    >
                      <AddIcon color='primary' />
                      記事を追加
                    </Typography>
                  </a>
                </Link>
              </Box>
              <Box component='ul' p={0}>
                {filterPosts.map((post: { id: string; title: string }) => (
                  <CategoryPost key={post.id} post={post} />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default EditTags;

const style = {
  height: '48px',
  padding: '8px 8px 8px 48px',
  cursor: 'pointer',
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
};
