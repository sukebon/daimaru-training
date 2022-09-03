import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { categoriesState, subCategoriesState } from '../../../store';
import CategoryModal from '../../components/CategoryModal';
import Link from 'next/link';

const CreateCategory = () => {
  const [categoryId, setCategoryId] = useState(''); // カテゴリーのID;
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

  // カテゴリーを選択して「サブカテゴリーをフィルターした一覧」を取得
  const handleChecked = (id: string) => {
    const newArray = subCategories.filter(
      (category: { id: string; parentId: string }) => {
        if (id === category.parentId) return category;
      }
    );
    setCategoryId(id);
    setFilterSubCategories(newArray);
  };

  return (
    <>
      <Container maxWidth='lg'>
        <Box sx={{ flexGrow: 1 }} mt={12}>
          <Grid container spacing={0} border='1px solid #eee' bgcolor='white'>
            <Grid item xs={4} borderRight='1px solid #f4f4f4'>
              <Box p={2} bgcolor='white' borderBottom='1px solid #f4f4f4'>
                カテゴリー
              </Box>
              <Box>
                <CategoryModal
                  title={'カテゴリー'}
                  collectionName={'categories'}
                  funcSelect={1}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                  handleChecked={handleChecked}
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
                      onClick={() => handleChecked(category.id)}
                    >
                      {category.name}
                    </Box>
                  )
                )}
              </Box>
            </Grid>
            <Grid item xs={4} borderRight='1px solid #f4f4f4'>
              <Box p={2} bgcolor='white' borderBottom='1px solid #f4f4f4'>
                サブカテゴリー
              </Box>
              <Box>
                <CategoryModal
                  title={'サブカテゴリー'}
                  collectionName={'subCategories'}
                  funcSelect={2}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                  handleChecked={handleChecked}
                />
              </Box>
              <Box component='ul'>
                {filterSubCategories.map((category: any, index: number) => (
                  <Box
                    key={index}
                    component='li'
                    p={1}
                    sx={{ listStyle: 'none' }}
                  >
                    {category.name}
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
