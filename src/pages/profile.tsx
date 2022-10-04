import { Box, Button, Container, TextField } from '@mui/material';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { auth } from '../../firebase';
import { spinnerState } from '../../store';

type ProfileType = {
  name: string | null;
  email: string | null;
  baseName: string | null;
};

const Profile = () => {
  const user: any = auth.currentUser;
  const setSpinner = useSetRecoilState<boolean>(spinnerState);
  const [profile, setProfile] = useState<ProfileType>({
    name: '',
    email: '',
    baseName: '',
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setProfile({
            name: user.displayName,
            email: user.email,
            baseName: user.displayName,
          });
        } else {
          // User is signed out
          // ...
        }
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setProfile({ ...profile, [name]: value });
  };

  //profileを変更
  const updateProfileButton = () => {
    setSpinner(true);
    updateProfile(user, {
      displayName: profile.name,
    })
      .then(() => {
        console.log('変更しました');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setProfile({
          ...profile,
          baseName: profile.name,
        });
        setSpinner(false);
        window.alert('更新しました。');
      });
  };

  return (
    <Container maxWidth='xs'>
      <Box component='h1' mt={6} sx={{ fontSize: '1.2rem' }}>
        プロフィール
      </Box>
      <Box
        width='100%'
        bgcolor='white'
        p={3}
        border='1px solid #e1e1e1'
        sx={{ overflowWrap: 'break-word' }}
      >
        <Box textAlign='center'>
          <TextField
            id='outlined-basic'
            label='名前'
            variant='outlined'
            value={profile.name}
            name='name'
            onChange={(e) => handleInputChange(e)}
          />
        </Box>
        <Box mt={3} textAlign='center'>
          {profile.email}
        </Box>
        <Box textAlign='center'>
          <Button
            sx={{ mt: 2 }}
            variant='contained'
            onClick={updateProfileButton}
            disabled={profile.name === profile.baseName ? true : false}
          >
            更新
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
