import { Box, Container, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";

const Profile = () => {
  const [name, setName] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        setEmail(user.email);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <Box component="h1" mt={6} sx={{ fontSize: "1.2rem" }}>
        プロフィール
      </Box>
      <Box
        width="100%"
        bgcolor="white"
        p={3}
        border="1px solid #e1e1e1"
        sx={{ overflowWrap: "break-word" }}
      >
        <Box textAlign="center">{name}</Box>
        <Box textAlign="center">{email}</Box>
      </Box>
    </Container>
  );
};

export default Profile;
