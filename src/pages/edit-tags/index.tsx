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

type categoriesState = {
  id: string;
  name: string;
}[];

const EditTags = () => {
  const [categoryId, setCategoryId] = useState(''); // カテゴリーのID;
  const [subCategoryId, setSubCategoryId] = useState(''); // サブカテゴリーのID;
  const [postId, setPostId] = useState(''); // 記事のID
  const categories = useRecoilValue<categoriesState>(categoriesState); // カテゴリー一覧
  const subCategories = useRecoilValue(subCategoriesState); // サブカテゴリー一覧
  const posts = useRecoilValue(postsState); // 記事一覧
  const [filterSubCategories, setFilterSubCategories] = useState<any>([]); // 絞り込みをしたサブカテゴリー一覧
  const [filterPosts, setFilterPosts] = useState<any>([]); // 絞り込みをした記事一覧

  // サブカテゴリーリストの初期値
  useEffect(() => {
    setSubCategoryId('');
    setPostId('');
    const id = categoryId || (categories && categories[0] && categories[0].id);
    if (!id) return;
    const newSubArray: any = subCategories.filter(
      (subCategory: { id: string; categoryId: string }) => {
        if (id === subCategory.categoryId) return subCategory;
      }
    );
    setFilterSubCategories(newSubArray);
    if (!categoryId) setCategoryId(categories[0].id);
  }, [categoryId, categories, subCategories]);

  // 記事リストの初期値
  useEffect(() => {
    const id = subCategoryId;
    const newPostArray = posts.filter(
      (post: { id: string; subCategoryId: string }) => {
        if (id === post.subCategoryId) return post;
      }
    );
    setFilterPosts(newPostArray);
  }, [posts, subCategoryId]);

  // サブカテゴリーリストの一番最初に色をつける
  useEffect(() => {
    const id =
      filterSubCategories &&
      filterSubCategories[0] &&
      filterSubCategories[0].id;
    setSubCategoryId(id);
  }, [filterSubCategories]);

  // 記事リストの一番最初に色をつける
  useEffect(() => {
    const id = filterPosts && filterPosts[0] && filterPosts[0].id;
    setPostId(id);
  }, [filterPosts, subCategoryId]);

  // カテゴリーを選択して「サブカテゴリーをフィルターした一覧」を取得
  // カテゴリーを選択してIDを取得
  const handleCategoryChecked = (id: string) => {
    const newSubArray = subCategories.filter(
      (subCategory: { id: string; categoryId: string }) => {
        if (id === subCategory.categoryId) return subCategory;
      }
    );
    setCategoryId(id);
    setFilterSubCategories(newSubArray);
  };

  // サブカテゴリーを選択してIDを取得
  const handleSubCategoryChecked = (id: string) => {
    setSubCategoryId(id);
  };

  // 記事を選択してIDを取得
  const handlePostChecked = (id: string) => {
    setPostId(id);
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
                  <CategoryMenu docId={categoryId} funcSelect={1} />
                )}
              </Box>
              <Box>
                <CategoryAddModal
                  title={'カテゴリー'}
                  collectionName={'categories'}
                  funcSelect={1}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                />
              </Box>
              <Box component='ul' p={0}>
                {categories.map(
                  (category: { id: string; name: string }, index: number) => (
                    <Box
                      key={index}
                      component='li'
                      p={1}
                      pl={6}
                      sx={{
                        cursor: 'pointer',
                        listStyle: 'none',
                        backgroundColor:
                          categoryId === category.id ? '#f4f4f4' : '',
                      }}
                      onClick={() => handleCategoryChecked(category.id)}
                    >
                      {category.name}
                    </Box>
                  )
                )}
              </Box>
            </Grid>
            <Grid item xs={4} borderRight='1px solid #e1e1e1'>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                p={2}
                bgcolor='white'
                borderBottom='1px solid #f4f4f4'
              >
                サブカテゴリー
                {filterSubCategories.length !== 0 && (
                  <CategoryMenu docId={subCategoryId} funcSelect={2} />
                )}
              </Box>
              <Box>
                <CategoryAddModal
                  title={'サブカテゴリー'}
                  collectionName={'subCategories'}
                  funcSelect={2}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                />
              </Box>
              <Box component='ul' p={0}>
                {filterSubCategories.map((subCategory: any, index: number) => (
                  <Box
                    key={index}
                    component='li'
                    p={1}
                    pl={6}
                    sx={{
                      cursor: 'pointer',
                      listStyle: 'none',
                      backgroundColor:
                        subCategoryId === subCategory.id ? '#f4f4f4' : '',
                    }}
                    onClick={() => handleSubCategoryChecked(subCategory.id)}
                  >
                    {subCategory.name}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                p={2}
                bgcolor='white'
                borderBottom='1px solid #f4f4f4'
              >
                記事一覧
                {filterPosts.length !== 0 && (
                  <CategoryMenu docId={categoryId} funcSelect={1} />
                )}
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
                {filterPosts.map((post: any, index: number) => (
                  <Box
                    key={index}
                    component='li'
                    p={1}
                    pl={6}
                    sx={{
                      cursor: 'pointer',
                      listStyle: 'none',
                      backgroundColor: postId === post.id ? '#f4f4f4' : '',
                    }}
                    onClick={() => handlePostChecked(post.id)}
                  >
                    {post.title}
                  </Box>
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
