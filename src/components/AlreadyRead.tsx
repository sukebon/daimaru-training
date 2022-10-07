import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  alreadyReadListState,
  articlesState,
  authState,
  postsState,
  spinnerState,
} from "../../store";
import { NextPage } from "next";

type Props = {
  post: {
    id: string;
    title: string;
    content: string;
    category: {
      categoryName: string;
    };
  };
};

const AlreadyRead: NextPage<Props> = ({ post }) => {
  const currentUser = useRecoilValue(authState);
  const articles = useRecoilValue<any>(articlesState);
  const alreadyReadList = useRecoilValue(alreadyReadListState);
  const [includingMembers, setIncludingMembers] = useState<boolean>();
  const [readMembers, setReadMembers] = useState([]);
  const [authorityUsers, setAuthorityUsers] = useState<any>();
  const setSpinner = useSetRecoilState(spinnerState);

  // 既読にする
  const addMemberPost = async () => {
    const result = confirm("既読にして宜しいでしょうか");
    if (!result) return;
    try {
      setSpinner(true);
      const postRef = doc(db, "articles", `${post.id}`);
      const docSnap = await getDoc(postRef);
      if (docSnap.exists()) {
        await updateDoc(postRef, {
          members: arrayUnion(currentUser),
        });
      } else {
        await setDoc(postRef, {
          members: arrayUnion(currentUser),
          createdAt: serverTimestamp(),
        });
      }
      const docRef = await addDoc(collection(db, "alreadyReadList"), {
        uid: currentUser,
        postId: post.id,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setSpinner(false);
    }
  };

  // 既読リスト取得
  useEffect(() => {
    const members: any = alreadyReadList.filter(
      (list: { postId: string; createdAt: Timestamp; uid: string }) => {
        if (list.postId === post.id) return list;
      }
    );
    setReadMembers(members);
  }, [alreadyReadList, post.id]);

  // currentUserが既読リストに含まれているか確認
  useEffect(() => {
    const article: any = articles.find((article: { id: string }) => {
      if (article.id == post.id) return article;
    });
    if (!article) return;
    const result = article.members.includes(currentUser);
    setIncludingMembers(result);
  }, [currentUser, articles, post.id]);

  // ディスプレイネームを表示
  const onDisplayName = (userId: string) => {
    const user = authorityUsers?.find((user: { uid: string }) => {
      if (user.uid === userId) return user;
    });
    return user?.name;
  };

  // users一覧
  useEffect(() => {
    const q = query(collection(db, "authority"), orderBy("rank", "asc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setAuthorityUsers(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  return (
    <>
      {!includingMembers && (
        <Box
          width="100%"
          bgcolor="white"
          p={3}
          mt={3}
          textAlign="center"
          border="1px solid #e1e1e1"
          sx={{ overflowWrap: "break-word" }}
        >
          <Typography>確認したら既読ボタンを押してください。</Typography>
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={() => {
              addMemberPost();
            }}
          >
            既読にする
          </Button>
        </Box>
      )}
      {readMembers.length > 0 && (
        <Box
          width="100%"
          bgcolor="white"
          p={3}
          pt={0}
          mt={3}
          textAlign="center"
          border="1px solid #e1e1e1"
          sx={{ overflowWrap: "break-word" }}
        >
          <Box component="h3" textAlign="left">
            研修済み
          </Box>
          {readMembers.map(
            (member: { id: string; uid: string; createdAt: Timestamp }) => (
              <Box key={member.id} display="flex">
                <Box mr={3}>{onDisplayName(member.uid)}</Box>
                <Box>
                  {member.createdAt &&
                    member.createdAt.toDate().toLocaleString()}
                </Box>
              </Box>
            )
          )}
        </Box>
      )}
    </>
  );
};

export default AlreadyRead;
