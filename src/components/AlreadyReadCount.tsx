import { Box } from "@mui/system";
import { NextPage } from "next";
import React from "react";
import { useRecoilValue } from "recoil";
import { alreadyReadListState } from "../../store";

type Props = {
  postId: string;
};

const AlreadyReadCount: NextPage<Props> = ({ postId }) => {
  const alreadyReadList = useRecoilValue(alreadyReadListState);

  const onAlreadyReadCount = (id: string) => {
    const filterAlreadyReadList = alreadyReadList.filter(
      (list: { postId: string }) => {
        if (list.postId === id) return list;
      }
    );
    return filterAlreadyReadList.length;
  };

  return (
    <Box display="flex">
      <Box component="span" mr={2} display="flex">
        <Box mr={1}>既読数</Box>
        {onAlreadyReadCount(postId)}
      </Box>
      <Box component="span" mr={2} display="flex"></Box>
    </Box>
  );
};

export default AlreadyReadCount;
