import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";

import { FETCH_POSTS } from "../util/graphql";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  CircularProgress,
} from "@mui/material";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { data } = useQuery(FETCH_POSTS);
  let posts;

  if (data) {
    posts = data.getPosts;
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box>
          {user && <PostForm />}
          <Typography variant="h3" gutterBottom component="h3">
            Recent Posts
          </Typography>
          {data ? (
            posts && posts.map((post) => <PostCard post={post} key={post.id} />)
          ) : (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;
