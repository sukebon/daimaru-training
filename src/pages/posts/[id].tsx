import { Breadcrumbs, Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { authState, postsState } from '../../../store';
import AlreadyReadArea from '../../components/AlreadyRead';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type Props = {
  post: {
    id: string;
    title: string;
    content: string;
    category: {
      categoryName: string;
    };
    updatedAt: string;
  };
};

const PostId: NextPage<Props> = ({ post }) => {
  const currentUser = useRecoilValue(authState);
  const posts: { id: string; title: string }[] | never =
    useRecoilValue(postsState); // 記事一覧
  const onDate = (time: string) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const d = date.getDate();
    return `${year}-${month}-${d}`;
  };

  const onNextPrevButton = (index: number) => {
    const arrayPostId = posts.map((post: { id: string }) => {
      return post.id;
    });
    const currentIndex = arrayPostId.indexOf(post.id);
    const nextPrevIndex = currentIndex + index;

    if (posts.length <= nextPrevIndex || 0 > nextPrevIndex) return '';
    return (
      <Link href={`/posts/${posts[nextPrevIndex].id}`}>
        <a>
          <Box display='flex' alignItems='center'>
            {index === -1 && <ChevronLeftIcon />}
            {posts[nextPrevIndex].title}
            {index === 1 && <ChevronRightIcon />}
          </Box>
        </a>
      </Link>
    );
  };

  return (
    <>
      {currentUser && (
        <>
          <Box role='presentation' p={1}>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link color='inherit' href={'/'}>
                <a>Top</a>
              </Link>

              <Typography color='text.primary'>
                {post.category ? post.category.categoryName : '未分類'}
              </Typography>

              <Typography color='text.primary'>{post.title}</Typography>
            </Breadcrumbs>
          </Box>
          <Container maxWidth='md' sx={{ py: 6 }}>
            <Box
              width='100%'
              bgcolor='white'
              p={3}
              border='1px solid #e1e1e1'
              sx={{ overflowWrap: 'break-word' }}
            >
              <Box textAlign='right' fontSize='1rem'>
                {onDate(post.updatedAt)}
              </Box>
              <Box
                component='h1'
                textAlign='center'
                mb={5}
                sx={{ fontSize: '2rem', fontWeight: 'bold' }}
              >
                {post.title}
              </Box>
              <Box
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              ></Box>
            </Box>
            <AlreadyReadArea post={post} />
            <Box
              width='100%'
              mt={2}
              display='flex'
              justifyContent='space-between'
            >
              <Button>{onNextPrevButton(-1)}</Button>
              <Button>{onNextPrevButton(1)}</Button>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default PostId;

export async function getStaticPaths() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const option: {} = {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
    },
  };
  const res = await fetch(BASE_URL + 'posts', option);
  const json = await res.json();
  const paths = json.contents.map(
    (content: { id: string; title: string; content: string }) => ({
      params: {
        id: content.id,
        title: content.title,
        content: content.content,
      },
    })
  );
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const option: {} = {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
    },
  };
  const res = await fetch(BASE_URL + `posts/${params.id}`, option);
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
}
