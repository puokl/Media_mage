import React, { useState } from "react";
//import { useState } from "react/cjs/react.production.min";
import { Card, Button, Stack, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import PropTypes from "prop-types";
import "./CreatePost.css"

function CreatePostInput(props) {
    const {postList, setPostList} = props;
    const [newPostContent, setNewPostContent] = useState("");
    const [newPostTitle, setNewPostTitle] = useState("");

    const handleEnterDown = (event) => {
        if (event.key === "Enter") {
            handlePostCreation();
        }
    };

    const handlePostCreation  = () => {
            const newPost = {
                user: [],
                type: "text",
                length: 1,
                postId: 1,
                postContent: newPostContent,
                postTitle: newPostTitle,
                comments: [],
            }
            setPostList([newPost,...postList])
            setNewPostTitle("")
            setNewPostContent("")
    }
    

    return (
        <>
        <Card className="create-post">
            <Card.Body>
            <Card.Title>
            Create a text post
            </Card.Title>
            <Stack className="post-input" direction="vertical" gap={3}>
            <Form.Control className="me-auto" as="input" type="text" value={newPostTitle} placeholder="Give your new post a title (or not)..."  onChange={(e) => setNewPostTitle(e.target.value)}/>
            <Stack direction="horizontal" gap={3}>
            <Form.Control className="me-auto" as="textarea" type="text" value={newPostContent} placeholder="What's on your mind..."  onChange={(e) => setNewPostContent(e.target.value)}/>
            <Button variant="primary" onClick={handlePostCreation} onKeyDown={handleEnterDown}>POST</Button>
            </Stack>
            </Stack>
            </Card.Body>
        </Card>
        <hr className="outside-card-hr" />
        </>
    );

}

export default CreatePostInput;