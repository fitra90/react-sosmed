import React, { useState, useEffect } from "react";
import { Table, Breadcrumb, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus } from "react-icons/fa";
import Loading from "./../components/Loading";

function PostList({ match }) {
  useEffect(() => {
    getPostList();
  }, []);

  const [postLists, setPostLists] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState([]);
  const [newPostContent, setNewPostContent] = useState([]);
  const [stillLoading, setStillLoading] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = editComment => {
    // setNewCommentName(editComment.name);
    // setNewCommentEmail(editComment.email);
    // setNewCommentText(editComment.body);
    // setNewCommentId(editComment.id);
    setShow(true);
  };

  const handleNewPostTitle = postTitle => {
    setNewPostTitle(postTitle.target.value);
  };
  const handleNewPostContent = postContent => {
    setNewPostContent(postContent.target.value);
  };

  const getPostList = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${match.params.userId}`,
      {
        headers: { "Content-type": "text/json" }
      }
    );
    const items = await data.json();
    // console.log(items);
    setPostLists(items);
    setStillLoading(false);
  };

  const deleteConfirm = id => {
    let r = window.confirm("Are you sure want to delete this post? ");
    if (r == true) {
      deletePost(id);
    } else {
      // do nothing
    }
  };

  const deletePost = async deletePostId => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${deletePostId}`,
      {
        method: "DELETE"
      }
    );
    if (data.status == 200 || data.status === 201) {
      alert("Post has been deleted!");

      let newPostList = postLists.filter(post => post.id != deletePostId);
      setPostLists(newPostList);
    } else {
      alert("Error deleting post!");
    }
  };

  const saveNewPost = async () => {
    if (newPostTitle.length < 1) {
      alert("Post title can't be empty");
    } else if (newPostContent.length < 1) {
      alert("Post content can't be empty");
    } else {
      setStillLoading(true);
      const data = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        body: JSON.stringify({
          title: newPostTitle,
          body: newPostContent,
          userId: match.params.userId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      if (data.status === 200 || data.status === 201) {
        const newPost = await data.json();
        newPost.userId = parseInt(newPost.userId, 10);
        postLists.push(newPost);

        setShow(false);
        setStillLoading(false);
      } else {
        alert("Error creating post!");
        setStillLoading(false);
      }
    }
  };

  if (stillLoading) {
    return <Loading />;
  } else {
    return (
      <div className="container">
        <Breadcrumb style={{ marginTop: 10 }}>
          <Breadcrumb.Item href="/">User List</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Post of {match.params.userName}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Button
          style={{ marginBottom: 10 }}
          variant="success"
          onClick={() => handleShow()}
        >
          <FaPlus style={{ marginBottom: 3 }} /> Create Post
        </Button>
        <br />
        <Table hover>
          <thead>
            <tr>
              <th>Post Title </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {postLists.map(post => (
              <tr key={post.id}>
                <td>
                  <Link
                    to={"/post/" + post.id + "/" + match.params.userName}
                    style={{ textTransform: "capitalize" }}
                  >
                    {post.title}
                  </Link>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteConfirm(post.id)}
                  >
                    <FaTrash style={{ marginBottom: 3 }} /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} size="lg" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignSelf: "center", width: "80%" }}>
            <Form>
              <Form.Group>
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={""}
                  onChange={handleNewPostTitle}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  defaultValue={""}
                  onChange={handleNewPostContent}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              style={{ float: "left" }}
              onClick={() => {
                saveNewPost();
              }}
            >
              Save
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default PostList;
