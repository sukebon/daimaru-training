import { Breadcrumbs, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import AlreadyReadArea from "../../components/AlreadyRead";

type Props = {
  post: {
    id: string;
    title: string;
    content: string;
    category: {
      categoryName: string;
    };
    updatedAt: string;
  };
};

const PostId: NextPage<Props> = ({ post }) => {
  const onDate = (time: string) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const d = date.getDate();
    return `${year}-${month}-${d}`;
  };

  return (
    <>
      {post && (
        <>
          <Box role="presentation" p={1}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href={"/"}>
                <a>Top</a>
              </Link>

              <Typography color="text.primary">
                {post.category.categoryName}
              </Typography>

              <Typography color="text.primary">{post.title}</Typography>
            </Breadcrumbs>
          </Box>
          <Container maxWidth="md" sx={{ py: 6 }}>
            <Box
              width="100%"
              bgcolor="white"
              p={3}
              border="1px solid #e1e1e1"
              sx={{ overflowWrap: "break-word" }}
            >
              <Box textAlign="right" fontSize="1rem">
                {onDate(post.updatedAt)}
              </Box>
              <Box
                component="h1"
                textAlign="center"
                mb={5}
                sx={{ fontSize: "2rem", fontWeight: "bold" }}
              >
                {post.title}
              </Box>
              <Box
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              ></Box>
            </Box>
            <AlreadyReadArea post={post} />
          </Container>
        </>
      )}
    </>
  );
};

export default PostId;

export async function getStaticPaths() {
  const option: {} = {
    headers: {
      "X-MICROCMS-API-KEY": "5ac00910d20842ae9c2e74629aca309fa76c",
    },
  };
  const res = await fetch("https://traning.microcms.io/api/v1/posts", option);
  const json = await res.json();
  const paths = json.contents.map(
    (content: { id: string; title: string; content: string }) => ({
      params: {
        id: content.id,
        title: content.title,
        content: content.content,
      },
    })
  );
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const option: {} = {
    headers: {
      "X-MICROCMS-API-KEY": "5ac00910d20842ae9c2e74629aca309fa76c",
    },
  };
  const res = await fetch(
    `https://traning.microcms.io/api/v1/posts/${params.id}`,
    option
  );
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
}
