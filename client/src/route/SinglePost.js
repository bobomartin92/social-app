import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth";
import {
  FETCH_POST,
  LIKE_POST,
  DELETE_POST,
  DELETE_COMMENT,
} from "../util/graphql";
import {
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentForm from "../components/CommentForm";

const SinglePost = () => {
  const { postId } = useParams();
  const variables = { postId, commentId: null };
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { data } = useQuery(FETCH_POST, {
    variables: { postId },
  });

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId },
    refetchQueries: [FETCH_POST],
  });

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId },
    onCompleted() {
      navigate("/");
    },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: variables,
    refetchQueries: [FETCH_POST],
  });

  const handleLikePost = () => {
    likePost();
  };

  const liked =
    user && data?.getPost.likes.find((l) => l.username === user.username);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = async (id) => {
    variables.commentId = id;
    deleteComment();

    setAnchorEl(null);
  };

  return (
    <Box sx={{ maxWidth: 645, margin: "15px auto" }}>
      {data && data.getPost ? (
        <>
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                  {data.getPost.username.slice(0, 1).toUpperCase()}
                </Avatar>
              }
              action={
                user &&
                data.getPost.username === user.username && (
                  <>
                    <IconButton
                      id="delete-button"
                      aria-label="delete"
                      aria-controls={open ? "delete-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <DeleteIcon fontSize="small" sx={{ color: red[900] }} />
                    </IconButton>
                    <Menu
                      id="delete-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "delete-button",
                      }}
                    >
                      <MenuItem onClick={deletePost}>Delete</MenuItem>
                    </Menu>
                  </>
                )
              }
              title={data.getPost.username}
              subheader={moment(data.getPost.createdAt).fromNow()}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {data.getPost.body}
              </Typography>
            </CardContent>
            <Divider variant="middle" />
            <CardActions disableSpacing>
              <Tooltip title="Like" arrow>
                <span>
                  <IconButton
                    aria-label="add to favorites"
                    disabled={!user ? true : false}
                    onClick={handleLikePost}
                  >
                    {liked ? (
                      <ThumbUpIcon
                        color="primary"
                        sx={{ marginRight: "4px" }}
                        fontSize="small"
                      />
                    ) : (
                      <ThumbUpOutlinedIcon
                        sx={{ marginRight: "4px" }}
                        fontSize="small"
                      />
                    )}

                    <Typography variant="h6">
                      {" "}
                      {data.getPost.likeCount}{" "}
                    </Typography>
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Comment" arrow>
                <IconButton aria-label="comment">
                  <CommentIcon sx={{ marginRight: "4px" }} fontSize="small" />
                  <Typography variant="h6">
                    {" "}
                    {data.getPost.commentCount}{" "}
                  </Typography>
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
          <br />
          {user && <CommentForm />}

          {data.getPost.comments &&
            data.getPost.comments.map((comment) => (
              <Card
                key={comment.id}
                sx={{ maxWidth: 600, margin: "15px auto" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                      {comment.username.slice(0, 1).toUpperCase()}
                    </Avatar>
                  }
                  action={
                    user &&
                    comment.username === user.username && (
                      <>
                        <IconButton
                          id="delete-button"
                          aria-label="delete"
                          aria-controls={open ? "delete-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        >
                          <DeleteIcon
                            fontSize="small"
                            sx={{ color: red[900] }}
                          />
                        </IconButton>
                        <Menu
                          id="delete-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "delete-button",
                          }}
                        >
                          <MenuItem
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </>
                    )
                  }
                  title={comment.username}
                  subheader={moment(comment.createdAt).fromNow()}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {comment.body}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default SinglePost;
