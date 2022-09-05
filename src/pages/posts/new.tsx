import { ThemeContext } from "@emotion/react";
import { Palette } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextareaAutosize,
  ThemeProvider,
} from "@mui/material";
import { palette } from "@mui/system";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "../../../firebase";
import {
  authState,
  categoriesState,
  spinnerState,
  subCategoriesState,
} from "../../../store";
import SpinnerLoading from "../../components/SpinnerLoading";

const New = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [subCategoryId, setSubCategoryId] = React.useState("");

  const categories: any = useRecoilValue(categoriesState); // カテゴリー一覧
  const subCategories: any = useRecoilValue(subCategoriesState); // サブカテゴリー一覧
  const [filterSubCategories, setFilterSubCategories] = useState<any>([]); // 絞り込みをしたサブカテゴリー一覧
  const setSpinner = useSetRecoilState<any>(spinnerState);

  // カテゴリーを選択して「サブカテゴリーをフィルターした一覧」を取得
  useEffect(() => {
    const newArray = subCategories.filter(
      (subCategory: { id: string; categoryId: string }) => {
        if (categoryId === subCategory.categoryId) return subCategory;
      }
    );
    setFilterSubCategories(newArray);
  }, [categoryId, subCategories]);

  // 記事の登録
  const addPost = async () => {
    setSpinner(true);
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        categoryId,
        subCategoryId,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setContent("");
      setCategoryId("");
      setSubCategoryId("");
    } catch (err) {
      console.log(err);
    } finally {
      alert("登録しました");
      setSpinner(false);
    }
  };

  // 未記入の場合 登録ボタンを無効化
  const buttonDisabled = !title || !content || !categoryId || !subCategoryId;

  return (
    <>
      <Container maxWidth="md">
        <Box component="h1" mt={6} sx={{ fontSize: "1.2rem" }}>
          記事を作成する
        </Box>
        <Box width="100%" bgcolor="white" p={3} border="1px solid #e1e1e1">
          <Box display="flex" sx={{ minWidth: 120, gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">カテゴリー選択</InputLabel>
              <Select
                labelId="category-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="カテゴリー選択"
                required
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((category: { id: string; name: string }) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="subcategory-select-label">
                サブカテゴリー選択
              </InputLabel>
              <Select
                labelId="subcategory-select-label"
                id="subcategory-select"
                label="サブカテゴリー選択"
                required
                disabled={!categoryId}
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
              >
                {filterSubCategories.map(
                  (category: { id: string; name: string }) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel htmlFor="title-input">タイトル</InputLabel>
            <OutlinedInput
              id="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Amount"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <TextareaAutosize
              maxRows={12}
              aria-label="maximum height"
              placeholder="内容"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                minHeight: "200px",
                resize: "vertical",
                borderRadius: 3,
                font: "inherit",
                padding: "16.5px 14px",
              }}
            />
          </FormControl>
          <Box width="100%" textAlign="center">
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              disabled={buttonDisabled}
              onClick={addPost}
            >
              登録
            </Button>
          </Box>
        </Box>
      </Container>
      <SpinnerLoading />
    </>
  );
};

export default New;
