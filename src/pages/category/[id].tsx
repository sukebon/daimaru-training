import { Box, Container } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { postsState, subCategoriesState } from '../../../store';

const CategoryId = () => {
  const router = useRouter();
  const postId = router.query.id;
  const subCategories = useRecoilValue(subCategoriesState); // サブカテゴリー一覧
  const posts = useRecoilValue(postsState); // 記事一覧
  const [headline, setHeadline] = useState('');
  const [filterPosts, setFilterPosts] = useState([]);

  // サブカテゴリーで絞り込みをした記事一覧
  useEffect(() => {
    const newPostArray = posts.filter((post: { subCategoryId: string }) => {
      if (post.subCategoryId === postId) return post;
    });
    setFilterPosts(newPostArray);
  }, [postId, posts]);

  // サブカテゴリーの名前を取得
  useEffect(() => {
    const newSubObject: any = subCategories.find(
      (subCategory: { id: string; name: string }) => {
        if (subCategory.id === postId) return subCategory;
      }
    );
    setHeadline(newSubObject.name);
  }, [postId, subCategories]);

  return (
    <Container maxWidth='md'>
      <Box width='100%' sx={{ p: 6, pt: 1, mt: 6, backgroundColor: 'white' }}>
        <Box component='h1'>{headline}</Box>
        {filterPosts.map((post: { id: string; title: string }) => (
          <Box key={post.id}>{post.title}</Box>
        ))}
      </Box>
    </Container>
  );
};

export default CategoryId;
