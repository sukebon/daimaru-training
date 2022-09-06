import { Box } from '@mui/system';
import { NextPage } from 'next';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { alreadyReadListState } from '../../store';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

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
    <Box display='flex'>
      <Box
        component='span'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Box mr={1} display='flex' justifyContent='center' alignItems='center'>
          <EmojiPeopleIcon />
        </Box>
        {onAlreadyReadCount(postId)}
      </Box>
      <Box component='span' mr={2} display='flex'></Box>
    </Box>
  );
};

export default AlreadyReadCount;
