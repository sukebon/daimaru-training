import { Box } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../../store';
import AlreadyReadCount from './AlreadyReadCount';

type Props = {
  posts: {
    id: string;
    title: string;
    content: string;
  }[];
  articles: {
    id: string;
    members: string[];
  }[];
};

const PostList: NextPage<Props> = ({ posts, articles }) => {
  const currentUser = useRecoilValue(authState);

  // 未読の場合、「未読」を表示
  const unreadIcon = (postId: string) => {
    const article = articles.find((article: { id: string }) => {
      if (article.id === postId) return true;
    });
    if (!article) return true; //誰にも見られてなかったら未読を表示
    const result = article.members.includes(currentUser);
    if (!result) return true; //自分が見ていなかったら未読を表示
    return false;
  };

  return (
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
                  <Box>
                    {post.title}
                    {unreadIcon(post.id) && (
                      <Box
                        component='span'
                        ml={1}
                        px={1}
                        borderRadius={1}
                        display='inline-block'
                        color='white'
                        bgcolor='#03a9f4'
                      >
                        未読
                      </Box>
                    )}
                  </Box>
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
  );
};

export default PostList;
