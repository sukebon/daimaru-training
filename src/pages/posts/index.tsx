import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { authState, postsState } from '../../../store';
import AlreadyReadCount from '../../components/AlreadyReadCount';

type Props = {
  posts: {
    id: string;
    title: string;
    content: string;
  }[];
};

const Posts: NextPage<Props> = () => {
  const currentUser = useRecoilValue(authState);
  const posts = useRecoilValue(postsState); // 記事一覧
  return (
    <>
      {currentUser && (
        <>
          <Container maxWidth='md'>
            <Box component='h1' mt={6} sx={{ fontSize: '1.2rem' }}>
              記事一覧
            </Box>
            <Box width='100%'>
              {posts.length >= 1 ? (
                <Box
                  component='ul'
                  p={0}
                  border='1px solid #e1e1e1'
                  borderBottom='none'
                  sx={{ backgroundColor: 'white' }}
                >
                  {posts.map((post: { id: string; title: string }) => (
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
                          <Box>
                            <AlreadyReadCount postId={post.id} />
                          </Box>
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
      )}
    </>
  );
};

export default Posts;
