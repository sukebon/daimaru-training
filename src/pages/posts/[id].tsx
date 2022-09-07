import { Breadcrumbs, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { categoriesState, postsState } from '../../../store';
import AlreadyReadArea from '../../components/AlreadyRead';

const PostId = () => {
  const router = useRouter();
  const postId = router.query.id;
  const categories = useRecoilValue(categoriesState); // カテゴリー一覧
  const posts = useRecoilValue(postsState); // 記事一覧
  const [categoryName, setcategoryName] = useState('');
  const [post, setPost] = useState({
    title: '',
    id: '',
    content: '',
    members: [],
    categoryId: '',
  });

  // 記事を取得 カテゴリーネームを取得
  useEffect(() => {
    const newPostObject: any = posts.find((post: { id: string }) => {
      if (post.id === postId) return post;
    });
    setPost(newPostObject);

    const findCategory: any = categories.find(
      (category: { id: string; name: string }) => {
        if (category.id === newPostObject.categoryId) return category;
      }
    );
    if (!findCategory) return;
    setcategoryName(findCategory.name);
  }, [categories, postId, posts]);

  return (
    <>
      {post && (
        <>
          <Box role='presentation' p={1}>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link color='inherit' href={'/'}>
                <a>Top</a>
              </Link>

              <Typography color='text.primary'>
                {categoryName ? categoryName : '未分類'}
              </Typography>

              <Typography color='text.primary'>{post.title}</Typography>
            </Breadcrumbs>
          </Box>
          <Container maxWidth='md'>
            <Box component='h1' mt={6} sx={{ fontSize: '1.2rem' }}>
              {post.title}
            </Box>
            <Box
              width='100%'
              bgcolor='white'
              p={3}
              border='1px solid #e1e1e1'
              sx={{ overflowWrap: 'break-word' }}
            >
              <Typography width='100%' whiteSpace='pre-wrap'>
                {post.content}
              </Typography>
            </Box>
            <AlreadyReadArea post={post} />
          </Container>
        </>
      )}
    </>
  );
};

export default PostId;
