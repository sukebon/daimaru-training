import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  alreadyReadListState,
  authState,
  postsState,
  spinnerState,
} from "../../store";
import { NextPage } from "next";
import { Users } from "../../data";

type Props = {
  post: {
    id: string;
    members: string[];
  };
};

const AlreadyRead: NextPage<Props> = ({ post }) => {
  const currentUser = useRecoilValue(authState);
  const [memberInclude, setMemberInclude] = useState<boolean>();
  const alreadyReadList = useRecoilValue(alreadyReadListState);
  const [readMember, setReadMember] = useState([]);
  const setSpinner = useSetRecoilState(spinnerState);

  // 既読にする
  const addMemberPost = async (id: string | string[] | undefined) => {
    const result = confirm("既読にして宜しいでしょうか");
    if (!result) return;
    setSpinner(true);
    try {
      const postRef = doc(db, "posts", `${id}`);
      await updateDoc(postRef, {
        members: arrayUnion(currentUser),
      });
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
    const member: any = alreadyReadList.filter(
      (list: { postId: string; createdAt: Timestamp }) => {
        if (list.postId === post.id) return list;
      }
    );
    setReadMember(member);
  }, [alreadyReadList, post.id]);

  // currentUserが既読リストに含まれているか確認
  useEffect(() => {
    if (!post.members) return;
    const result = post.members.includes(currentUser);
    setMemberInclude(result);
  }, [currentUser, post]);

  // ディスプレイネームを表示
  const onDisplayName = (userId: string) => {
    const user: any = Users.find((user) => {
      if (user.uid === userId) return user.name;
    });
    return user.name;
  };

  return (
    <>
      {!memberInclude && (
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
              addMemberPost(post.id);
            }}
          >
            既読にする
          </Button>
        </Box>
      )}
      {readMember.length > 0 && (
        <Box
          width="100%"
          bgcolor="white"
          p={3}
          mt={3}
          textAlign="center"
          border="1px solid #e1e1e1"
          sx={{ overflowWrap: "break-word" }}
        >
          {readMember.map(
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
