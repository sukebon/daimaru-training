import { stringLength } from "@firebase/util";
import { Breadcrumbs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { categoriesState, subCategoriesState } from "../../store";

type Props = {
  filterPost: {
    id: string;
    title: string;
    content: string;
    subCategoryId: string;
  };
};

const Breadcrumb: NextPage<Props> = ({ filterPost }) => {
  const categories = useRecoilValue(categoriesState); // カテゴリー一覧
  const subCategories = useRecoilValue(subCategoriesState); // サブカテゴリー一覧
  const [subCategoryObject, setSubCategoryObject] = useState({
    id: "",
    name: "",
    subCategoryId: "",
  });

  useEffect(() => {
    const newSubObject: any = subCategories.find(
      (subCategory: { id: string }) => {
        if (subCategory.id === filterPost.subCategoryId) return subCategory;
      }
    );
    if (!newSubObject) return;
    setSubCategoryObject(newSubObject);
  }, [filterPost, subCategories]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <Box role="presentation" p={1} onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href={"/"}>
          <a>Top</a>
        </Link>
        <Link color="inherit" href={`/category/${subCategoryObject.id}`}>
          <a>{subCategoryObject.name}</a>
        </Link>
        <Typography color="text.primary">{filterPost.title}</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
