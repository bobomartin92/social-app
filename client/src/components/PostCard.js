import React, { useContext, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../context/auth";
import { useMutation } from "@apollo/client";
import { DELETE_POST, LIKE_POST, FETCH_POSTS } from "../util/graphql";

const PostCard = ({
  post: { id, body, username, likes, likeCount, commentCount, createdAt },
}) => {
  const { user } = useContext(AuthContext);
  const [likePost] = useMutation(LIKE_POST, { variables: { postId: id } });
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId: id },
    refetchQueries: [FETCH_POSTS],
  });

  const handleLikePost = () => {
    likePost();
  };

  const liked = user && likes.find((l) => l.username === user.username);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ maxWidth: 645, margin: "15px auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
            {username.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        action={
          user &&
          username === user.username && (
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
        title={username}
        subheader={moment(createdAt).fromNow()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
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

              <Typography variant="h6"> {likeCount} </Typography>
            </IconButton>
          </span>
        </Tooltip>
        <Link style={{ textDecoration: "none" }} to={`/posts/${id}`}>
          <Tooltip title="Comment" arrow>
            <IconButton aria-label="comment">
              <CommentIcon sx={{ marginRight: "4px" }} fontSize="small" />
              <Typography variant="h6"> {commentCount} </Typography>
            </IconButton>
          </Tooltip>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PostCard;
