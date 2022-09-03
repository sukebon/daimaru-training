import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { categoriesState, subCategoriesState } from '../../../store';
import CategoryAddModal from '../../components/CategoryAddModal';
import Link from 'next/link';
import CategoryMenu from '../../components/CategoryMenu';

const CreateCategory = () => {
  const [categoryId, setCategoryId] = useState(''); // カテゴリーのID;
  const [subCategoryId, setSubCategoryId] = useState(''); // サブカテゴリーのID;
  const categories: any = useRecoilValue(categoriesState); // カテゴリー一覧
  const subCategories: any = useRecoilValue(subCategoriesState); // サブカテゴリー一覧
  const [filterSubCategories, setFilterSubCategories] = useState<any>([]); // 絞り込みをしたサブカテゴリー一覧

  // サブカテゴリーリストの初期値
  useEffect(() => {
    const id =
      categoryId || (categories && categories[0] && categories[0].id) || null;
    if (!id) return;
    const newArray = subCategories.filter(
      (category: { id: string; parentId: string }) => {
        if (id === category.parentId) return category;
      }
    );
    setFilterSubCategories(newArray);
    if (!categoryId) setCategoryId(categories[0].id);
  }, [categoryId, categories, subCategories]);

  // サブカテゴリーリストの一番最初に色をつける
  useEffect(() => {
    const id =
      filterSubCategories &&
      filterSubCategories[0] &&
      filterSubCategories[0].id;
    if (!id) return;
    setSubCategoryId(id);
  }, [filterSubCategories]);

  // カテゴリーを選択して「サブカテゴリーをフィルターした一覧」を取得
  // カテゴリーを選択してIDを取得
  const handleCategoryChecked = (id: string) => {
    const newArray = subCategories.filter(
      (category: { id: string; parentId: string }) => {
        if (id === category.parentId) return category;
      }
    );
    setCategoryId(id);
    setFilterSubCategories(newArray);
  };

  // サブカテゴリーを選択してIDを取得
  const handleSubCategoryChecked = (id: string) => {
    setSubCategoryId(id);
  };

  return (
    <>
      <Container maxWidth='lg'>
        <Box sx={{ flexGrow: 1 }} mt={12}>
          <Grid container spacing={0} border='1px solid #eee' bgcolor='white'>
            <Grid item xs={4} borderRight='1px solid #f4f4f4'>
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
                  handleChecked={handleCategoryChecked}
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
            <Grid item xs={4} borderRight='1px solid #f4f4f4'>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                p={2}
                bgcolor='white'
                borderBottom='1px solid #f4f4f4'
              >
                サブカテゴリー
                {subCategories.length !== 0 && (
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
                  handleChecked={handleCategoryChecked}
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
              <Box p={2} bgcolor='white' borderBottom='1px solid #f4f4f4'>
                記事一覧
              </Box>
              <Box>
                <Link href={'posts/new'}>
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
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default CreateCategory;
