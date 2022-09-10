import type { NextPage } from 'next';
import { useEffect } from 'react';
import { auth, db } from '../../firebase';
import Head from 'next/head';
import {
  alreadyReadListState,
  articlesState,
  authState,
  categoriesState,
  postsState,
} from '../../store';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { Box, Container } from '@mui/material';
import PostList from '../components/PostList';

const Home: NextPage = ({ postsApi, categoriesApi }: any) => {
  const currentUser = useRecoilValue(authState);
  const [categories, setCategories]: any = useRecoilState(categoriesState); // カテゴリー一覧
  const [posts, setPosts]: any = useRecoilState(postsState); // 記事一覧
  const [articles, setArticles] = useRecoilState<any>(articlesState);
  const [alreadyReadList, setAlreadyReadList]: any =
    useRecoilState(alreadyReadListState); // 記事一覧

  // 一覧を取得
  useEffect(() => {
    setPosts(postsApi);
    setCategories(categoriesApi);
  }, [postsApi, setPosts, categoriesApi, setCategories]);

  // 既読一覧を取得
  useEffect(() => {
    const q = query(
      collection(db, 'alreadyReadList'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (querySnapshot) => {
      setAlreadyReadList(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, [setAlreadyReadList]);

  // 既読一覧を取得
  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      setArticles(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, [setArticles]);

  //microCMSで記事を削除したらfirebaseのデータも削除する
  useEffect(() => {
    const deleteFirebaseData = async () => {
      if (articles.length <= posts.length) return;
      const postsIdArray = posts.map((post: { id: string }) => {
        return post.id;
      });
      const surplusId = articles.filter((article: { id: string }) => {
        if (!postsIdArray.includes(article.id)) return article;
      });

      surplusId.forEach(async (article: { id: string }) => {
        await deleteDoc(doc(db, 'articles', `${article.id}`));

        alreadyReadList.forEach(
          async (list: { postId: string; id: string }) => {
            if (list.postId === article.id) {
              await deleteDoc(doc(db, 'alreadyReadList', `${list.id}`));
            }
            return;
          }
        );
      });
    };
    deleteFirebaseData();
  }, [alreadyReadList, articles, posts]);

  return (
    <>
      {currentUser && (
        <>
          <Head>
            <title>大丸白衣 研修サイト</title>
          </Head>
          <Container maxWidth='md'>
            <Box component='h1' mt={6} sx={{ fontSize: '1.2rem' }}>
              研修一覧
            </Box>
            <PostList posts={posts} articles={articles} />
          </Container>
        </>
      )}
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const option: {} = {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
    },
  };
  const [resPosts, resCategories] = await Promise.all([
    fetch(BASE_URL + 'posts', option),
    fetch(BASE_URL + 'categories', option),
  ]);

  const jsonPosts = await resPosts.json();
  const postsApi = await jsonPosts.contents;

  const jsonCategories = await resCategories.json();
  const categoriesApi = await jsonCategories.contents;

  return {
    props: {
      postsApi,
      categoriesApi,
    },
  };
}
