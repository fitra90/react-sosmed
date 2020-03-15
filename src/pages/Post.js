import React, { useState, useEffect } from "react";
import { Card, Breadcrumb, Button, Form, Modal } from "react-bootstrap";
import Loading from "./../components/Loading";

function Post({ match }) {
  useEffect(() => {
    getPost();
    getComments();
  }, []);

  const [stillLoading, setStillLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState([]);
  const [editPostTitle, setEditPostTitle] = useState([]);
  const [editPostContent, setEditPostContent] = useState([]);

  const [newCommentName, setNewCommentName] = useState([]);
  const [newCommentEmail, setNewCommentEmail] = useState([]);
  const [newCommentText, setNewCommentText] = useState([]);
  const [newCommentId, setNewCommentId] = useState([]);

  //   const [commentNameToEdit, setCommentNameToEdit] = useState([]);
  //   const [commentEmailToEdit, setCommentEmailToEdit] = useState([]);
  //   const [commentTextToEdit, setcommentTextToEdit] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = editComment => {
    setNewCommentName(editComment.name);
    setNewCommentEmail(editComment.email);
    setNewCommentText(editComment.body);
    setNewCommentId(editComment.id);
    setShow(true);
  };

  const getPost = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${match.params.postId}`,
      {
        headers: { "Content-type": "text/json" }
      }
    );
    const items = await data.json();
    setPost(items);
  };

  const showEditor = () => {
    setIsEditing(true);
  };

  const showCommenting = () => {
    setIsCommenting(true);
  };

  const hideEditor = () => {
    setIsEditing(false);
  };

  const hideCommenting = () => {
    setIsCommenting(false);
  };

  const getComments = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${match.params.postId}/comments`,
      {
        headers: { "Content-type": "text/json" }
      }
    );
    const postComments = await data.json();
    setCommentCount(postComments.length);
    setComments(postComments);
    setStillLoading(false);
  };

  const deleteConfirm = id => {
    let r = window.confirm("Are you sure want to delete this comment? ");
    if (r == true) {
      deleteComment(id);
    } else {
      // do nothing
    }
  };

  const deleteComment = async commentId => {
    setStillLoading(true);
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts/comments?id=${commentId}`,
      {
        method: "DELETE"
      }
    );

    if (data.status == 200 || data.status === 201) {
      let newCommentList = comments.filter(comment => comment.id != commentId);
      setComments(newCommentList);
      setCommentCount(newCommentList.length);
      setStillLoading(false);
    } else {
      alert("Error deleting post!");
      setStillLoading(false);
    }
  };

  const handleEditPostTitle = t => {
    setEditPostTitle(t.target.value);
  };

  const handleEditPostContent = c => {
    setEditPostContent(c.target.value);
  };

  const handleCommentName = cn => {
    setNewCommentName(cn.target.value);
  };

  const handleCommentEmail = ce => {
    setNewCommentEmail(ce.target.value);
  };

  const handleCommentText = ct => {
    setNewCommentText(ct.target.value);
  };

  const updatePost = async id => {
    if (editPostTitle.length < 1) {
      alert("Post title can't be empty");
    } else if (editPostContent.length < 1) {
      alert("Post content can't be empty");
    } else {
      setStillLoading(true);
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${match.params.postId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: id,
            title: editPostTitle,
            body: editPostContent,
            userId: post.userId
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      );
      if (data.status === 200 || data.status === 201) {
        const editedPost = await data.json();
        setPost(editedPost);
        setIsEditing(false);
        setStillLoading(false);
      } else {
        alert("Error updating post!");
        setStillLoading(false);
      }
    }
  };

  const updateComment = async () => {
    if (newCommentName.length < 1) {
      alert("Please put your name!");
    } else if (newCommentEmail.length < 1) {
      alert("Please put your email!");
    } else if (newCommentText.length < 1) {
      alert("Please put your comment!");
    } else {
      setStillLoading(true);
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/posts/comments?id=${newCommentId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: newCommentName,
            email: newCommentEmail,
            body: newCommentText,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      );
      if (data.status === 200 || data.status === 201) {

        let editedComment = comments.map(comment => {
          if (comment.id === newCommentId) {
            comment.name = newCommentName;
            comment.email = newCommentEmail;
            comment.body = newCommentText;
            comment.postId = post.id;
            comment.id = newCommentId;
          }
        });
        setComments(editedComment);

        setShow(true);
        setStillLoading(false);
      } else {
        alert("Error updating comment!");
        setStillLoading(false);
      }
    }
  };
  const createNewComment = async () => {
    if (newCommentName.length < 1) {
      alert("Please put your name!");
    } else if (newCommentEmail.length < 1) {
      alert("Please put your email!");
    } else if (newCommentText.length < 1) {
      alert("Please put your comment!");
    } else {
      setStillLoading(true);
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/comments/`,
        {
          method: "POST",
          body: JSON.stringify({
            name: newCommentName,
            email: newCommentEmail,
            body: newCommentText,
            postId: post.id
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      );
      if (data.status === 200 || data.status === 201) {
        const insertNewComment = await data.json();

        comments.push(insertNewComment);
        setCommentCount(comments.length);

        setIsCommenting(false);
        setStillLoading(false);
      } else {
        alert("Error insert new comment!");
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
          <Breadcrumb.Item
            href={"/post-list/" + post.userId + "/" + match.params.userName}
          >
            Post of {match.params.userName}
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ textTransform: "capitalize" }}>
            {post.title}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <Card.Title style={{ textTransform: "capitalize" }}>
              {post.title}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Author: {match.params.userName}
            </Card.Subtitle>
            <Card.Text>
              <br />
              {post.body}
            </Card.Text>
            <Button onClick={() => showEditor()} style={{ float: "left" }}>
              Edit This Post
            </Button>
            &nbsp;
            <Button variant="success" onClick={() => showCommenting()}>
              Comment This Post
            </Button>
          </Card.Body>
        </Card>

        {isEditing ? (
          <Card bg="warning">
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Post Title</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={post.title}
                    onChange={handleEditPostTitle}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    defaultValue={post.body}
                    onChange={handleEditPostContent}
                  />
                </Form.Group>
                <Button
                  variant="success"
                  style={{ float: "left" }}
                  onClick={() => {
                    updatePost(post.id);
                  }}
                >
                  Save
                </Button>
                &nbsp;
                <Button variant="danger" onClick={() => hideEditor()}>
                  Cancel
                </Button>
              </Form>
            </Card.Body>
          </Card>
        ) : (
          ""
        )}

        {isCommenting ? (
          <Card bg="success">
            <Card.Header as="h5">New Comment</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={""}
                    onChange={handleCommentName}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={""}
                    onChange={handleCommentEmail}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    defaultValue={""}
                    onChange={handleCommentText}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  style={{ float: "left" }}
                  onClick={() => {
                    createNewComment();
                  }}
                >
                  Save
                </Button>
                &nbsp;
                <Button variant="danger" onClick={() => hideCommenting()}>
                  Cancel
                </Button>
              </Form>
            </Card.Body>
          </Card>
        ) : (
          ""
        )}
        <h5 style={{ marginTop: 50 }}>Comments ({commentCount})</h5>

        {comments.map(comment => (
          <Card
            bg="secondary"
            border="light"
            style={{ marginTop: 10 }}
            key={comment.id}
          >
            <Card.Body>
              <Card.Title
                style={{ textTransform: "capitalize", color: "wheat" }}
              >
                {comment.name}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <i style={{ color: "silver" }}>{comment.email}</i>
              </Card.Subtitle>
              <Card.Text style={{ color: "white" }}>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link
                style={{ color: "darkblue", cursor: "pointer" }}
                onClick={() => {
                  handleShow(comment);
                }}
              >
                Edit
              </Card.Link>
              <Card.Link
                style={{ color: "maroon", cursor: "pointer" }}
                onClick={() => deleteConfirm(comment.id)}
              >
                Delete
              </Card.Link>
            </Card.Body>
          </Card>
        ))}

        <Modal show={show} size="lg" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignSelf: "center", width: "80%" }}>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={newCommentName}
                  onChange={handleCommentName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={newCommentEmail}
                  onChange={handleCommentEmail}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  defaultValue={newCommentText}
                  onChange={handleCommentText}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              style={{ float: "left" }}
              onClick={() => {
                updateComment();
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

export default Post;
