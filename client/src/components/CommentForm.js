import { useForm } from "../util/customHooks";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";

import { CREATE_COMMENT, FETCH_POST } from "../util/graphql";

const CommentForm = () => {
  const { postId } = useParams();
  const { values, onChange, onSubmit } = useForm(createCommentCB, { body: "" });

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: { body: values.body, postId },
    refetchQueries: [FETCH_POST],
    onCompleted() {
      values.body = "";
    },
  });

  function createCommentCB() {
    createComment();
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
        label="Add Comment"
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
        Comment
      </Button>
    </Box>
  );
};

export default CommentForm;
