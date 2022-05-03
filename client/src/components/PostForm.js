import { useForm } from "../util/customHooks";
import { useMutation } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";

import { CREATE_POST, FETCH_POSTS } from "../util/graphql";

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCB, { body: "" });

  const [createPost] = useMutation(CREATE_POST, {
    variables: values,
    refetchQueries: [FETCH_POSTS],
    onCompleted() {
      values.body = "";
    },
  });

  function createPostCB() {
    createPost();
  }
  return (
    <Box
      sx={{ margin: "20px 0" }}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <TextField
        label="Create New Post"
        name="body"
        variant="outlined"
        fullWidth
        value={values.body}
        onChange={onChange}
      />
      <Button
        sx={{ margin: "5px 0" }}
        variant="contained"
        type="submit"
        disabled={!values.body.trim() ? true : false}
      >
        Submit
      </Button>
    </Box>
  );
};

export default PostForm;
