import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";

const AuthId = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const key = e.target.name;
    setProfile({ ...profile, [key]: value });
  };

  // user情報取得
  useEffect(() => {
    const getDocUser = async () => {
      const docRef = doc(db, "authority", `${router.query.id}`);
      const docSnap = await getDoc(docRef);
      setProfile({
        ...docSnap.data(),
      });
    };
    getDocUser();
  }, [router.query.id]);

  //user情報更新
  const updateProfile = async () => {
    const docRef = doc(db, "authority", `${router.query.id}`);
    await updateDoc(docRef, {
      name: profile.name,
      rank: profile.rank,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box component="h1" mt={6} sx={{ fontSize: "1.2rem" }}>
        ユーザーページ
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        maxWidth="sm"
        sx={{ p: 2, backgroundColor: "white", borderRadius: 2 }}
      >
        <Box>名前</Box>
        <TextField
          sx={{ mt: 1 }}
          name="name"
          value={profile?.name}
          onChange={handleInputChange}
        />
        <Box sx={{ mt: 3 }}>順位</Box>
        <TextField
          type="number"
          sx={{ mt: 1 }}
          name="rank"
          value={profile?.rank}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={updateProfile} sx={{ mt: 3 }}>
          更新
        </Button>
      </Box>
    </Container>
  );
};

export default AuthId;
