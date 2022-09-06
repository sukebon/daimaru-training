import { Breadcrumbs, Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  alreadyReadListState,
  authState,
  categoriesState,
  postsState,
  subCategoriesState,
} from '../../../store';
import AlreadyReadCount from '../../components/AlreadyReadCount';

const CategoryId = () => {
  const router = useRouter();
  const currentUser = useRecoilValue(authState);
  const subCategoryId = router.query.id;
  const categories = useRecoilValue(categoriesState); // カテゴリー一覧
  const subCategories = useRecoilValue(subCategoriesState); // サブカテゴリー一覧
  const posts = useRecoilValue(postsState); // 記事一覧
  const alreadyReadList = useRecoilValue(alreadyReadListState); // 既読者一覧
  const [headline, setHeadline] = useState(''); // 記事タイトル
  const [cateogryName, setCateogryName] = useState(''); // 記事タイトル
  const [filterPosts, setFilterPosts] = useState([]);
  const [alreadyReadLabel, setAlreadyReadLabel] = useState(false);

  // サブカテゴリーで絞り込みをした記事一覧
  useEffect(() => {
    const newPostArray = posts.filter((post: { subCategoryId: string }) => {
      if (post.subCategoryId === subCategoryId) return post;
    });
    setFilterPosts(newPostArray);
  }, [subCategoryId, posts]);

  // カテゴリーの名前とサブカテゴリーの名前を取得
  useEffect(() => {
    const newSubObject: any = subCategories.find(
      (subCategory: { id: string; name: string }) => {
        if (subCategory.id === subCategoryId) return subCategory;
      }
    );
    if (!newSubObject) return;
    setHeadline(newSubObject.name);
    const newCategoryObject: any = categories.find(
      (category: { id: string }) => {
        if (category.id === newSubObject.categoryId) return category;
      }
    );
    setCateogryName(newCategoryObject.name);
  }, [subCategoryId, subCategories, categories]);

  // useEffect(() => {
  //   const newAlreadyList: any = alreadyReadList.filter(
  //     (list: { postId: string; uid: string }) => {
  //       if (list.postId === subCategoryId) return list.uid;
  //     }
  //   );
  //   const result = newAlreadyList.includes(currentUser);
  //   if (result) {
  //     setAlreadyReadLabel(true);
  //   } else {
  //     setAlreadyReadLabel(false);
  //   }
  //   console.log(newAlreadyList);
  //   console.log(currentUser);
  //   console.log(subCategoryId);
  // }, [subCategoryId, alreadyReadList, currentUser]);

  return (
    <>
      <Box role='presentation' p={1}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link color='inherit' href={'/'}>
            <a>Top</a>
          </Link>
          <Typography color='text.primary'>{cateogryName}</Typography>
          <Typography color='text.primary'>{headline}</Typography>
        </Breadcrumbs>
      </Box>
      <Container maxWidth='md'>
        <Box component='h1' mt={6} sx={{ fontSize: '1.2rem' }}>
          {headline}
        </Box>
        <Box width='100%'>
          {filterPosts.length >= 1 ? (
            <Box
              component='ul'
              p={0}
              border='1px solid #e1e1e1'
              borderBottom='none'
              sx={{ backgroundColor: 'white' }}
            >
              {filterPosts.map((post: { id: string; title: string }) => (
                <Link href={`/posts/${post.id}`} key={post.id}>
                  <a>
                    <Box
                      component='li'
                      p={2}
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      borderBottom='1px solid #e1e1e1'
                      sx={{
                        listStyle: 'none',
                        '&:hover': {
                          background: '#e4e4e4',
                        },
                      }}
                    >
                      <Box>{post.title}</Box>
                      <AlreadyReadCount postId={post.id} />
                    </Box>
                  </a>
                </Link>
              ))}
            </Box>
          ) : (
            <Box p={6} textAlign='center' fontSize='1.2rem'>
              登録された記事がありません。
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default CategoryId;
