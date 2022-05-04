import React, { useState, useContext, useRef, useEffect } from "react";
import "./post.css";
import { Card, Button, Stack, Form } from "react-bootstrap";
//import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  faThumbsUp as fasThumbsUp,
  faThumbsDown as fasThumbsDown,
  faShareFromSquare as fasShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as farThumbsUp,
  faThumbsDown as farThumbsDown,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import moment from "moment";

function commentSection(props) {
  const { comments, postID, likes, dislikes } = props;
  const [commentList, setCommentList] = useState([...comments]);
  const { user } = useContext(AuthContext);
  const comment = useRef();
  const [isLiked, setIsLiked] = useState(likes.includes(user._id));
  const [isDisliked, setIsDisliked] = useState(dislikes.includes(user._id));

  const handleComment = async (e) => {
    e.preventDefault();
    const nComment = {
      username: user.username,
      userId: user._id,
      comment: comment.current.value,
      createdAt: new Date().toUTCString(),
    };
    try {
      await axios.patch("/posts/comment/" + postID, nComment);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    if (!dislikes.includes(user._id)) {
      const nLike = {
        userId: user._id,
      };
      try {
        await axios.patch("/posts/likes/" + postID, nLike);
        console.log("success");
        setIsLiked(!isLiked);
        likes.push(user._id);
      } catch (error) {
        console.log(error);
      }
    } else if (likes.includes(user._id)) {
      const nLike = {
        userId: user._id,
      };
      const index = likes.indexOf(user._id);
      try {
        await axios.patch("/posts/likes/" + postID, nLike);
        console.log("success");
        setIsLiked(!isLiked);
        likes.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDislike = async () => {
    if (!likes.includes(user._id)) {
      const nDislike = {
        userId: user._id,
      };
      try {
        await axios.patch("/posts/dislikes/" + postID, nDislike);
        setIsDisliked(!isDisliked);
        dislikes.push(user._id);
      } catch (error) {
        console.log(error);
      }
    } else if (dislikes.includes(user._id)) {
      const nDislike = {
        userId: user._id,
      };
      const index = dislikes.indexOf(user._id);
      try {
        await axios.patch("/posts/dislikes/" + postID, nDislike);
        setIsDisliked(!isDisliked);
        dislikes.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(comments.createdAt);
  return (
    <>
      <Stack className="comment-section" direction="vertical" gap={2}>
        <Form onSubmit={handleComment}>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              ref={comment}
              className="me-auto "
              placeholder="Comment..."
            />
            <Button variant="primary" type="submit">
              COMMENT
            </Button>
            <div className="vr" />
            <FontAwesomeIcon
              role="button"
              tabIndex={0}
              aria-label="Thumbs up"
              icon={isLiked ? fasThumbsUp : farThumbsUp}
              onClick={() => {
                handleLike();
              }}
              onKeyDown={null}
            />
            <FontAwesomeIcon
              role="button"
              tabIndex={0}
              aria-label="Thumbs down"
              icon={isDisliked ? fasThumbsDown : farThumbsDown}
              onClick={() => {
                handleDislike();
              }}
              onKeyDown={null}
            />
            <FontAwesomeIcon icon={fasShareFromSquare} />
          </Stack>
        </Form>
        {commentList.map((comment) => (
          <Stack
            direction="horizontal"
            key={comment.createdAt}
            gap={1}
            className="full-comment"
          >
            <img
              alt="icon"
              src="src/assets/images/icon.png"
              style={{
                width: "2rem",
                height: "auto",
                borderRadius: "50%",
                fitContent: "cover",
                marginRight: " 0.5rem",
              }}
            />
            <Stack direction="vertical" gap={1} className="comment-body">
              <Card.Text className="comment-username">
                {comment.username}
              </Card.Text>
              <Card.Text>{comment.comment}</Card.Text>
            </Stack>
            <Card.Text>{moment(comment.createdAt).fromNow()}</Card.Text>
            <hr />
          </Stack>
        ))}
      </Stack>
    </>
  );
}

export default commentSection;