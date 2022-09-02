import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categorys, setCategorys] = useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // カテゴリー登録
  const addCategory = async () => {
    const docRef = await addDoc(collection(db, "categorys"), {
      name: categoryName,
      slug: categorySlug,
    });
  };

  // カテゴリー一覧を取得
  useEffect(() => {
    const getCategorys = async () => {
      const querySnapshot = await getDocs(collection(db, "categorys"));
      setCategorys(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    };
    getCategorys();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }} mt={12}>
          <Grid container spacing={0} border="1px solid #eee" bgcolor="white">
            <Grid item xs={4} borderRight="1px solid #f4f4f4">
              <Box p={2} bgcolor="white" borderBottom="1px solid #f4f4f4">
                カテゴリー
              </Box>
              <Box>
                <Typography
                  p={2}
                  display="flex"
                  alignItems="center"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  onClick={handleOpen}
                >
                  <AddIcon color="primary" />
                  カテゴリーを追加
                </Typography>
              </Box>
              <Box component="ul">
                {categorys.map((category: any, index: number) => (
                  <Box
                    key={index}
                    component="li"
                    p={1}
                    sx={{ listStyle: "none" }}
                  >
                    {category.name}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={4} borderRight="1px solid #f4f4f4">
              <Box p={2} bgcolor="white" borderBottom="1px solid #f4f4f4">
                サブカテゴリー
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box p={2} bgcolor="white" borderBottom="1px solid #f4f4f4">
                記事一覧
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography component="h3" sx={{ mb: 2 }}>
              カテゴリー登録
            </Typography>
            <TextField
              id="outlined-basic"
              label="カテゴリー名"
              variant="outlined"
              size="small"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              id="outlined-basic"
              label="スラッグ"
              variant="outlined"
              size="small"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleClose}
                color={"inherit"}
                sx={{ mr: 1 }}
              >
                キャンセル
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  addCategory();
                  handleClose();
                }}
              >
                登録
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CreateCategory;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  width: 400,
  outline: "none",
  bgcolor: "white",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};
