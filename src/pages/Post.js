import React, { useState, useEffect } from "react";
import { Card, Breadcrumb, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash, FaPen } from "react-icons/fa";

function Post({ match }) {
  useEffect(() => {
    getPost();
    getComments();
  }, []);

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState([]);

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
  };

  const deleteConfirm = (type, id) => {
    let r = window.confirm("Are you sure want to delete this comment? ");
    if (r == true) {
      if (type == "comment") {
        deleteComment(id);
      } else {
        deletePost(id);
      }
    } else {
      // do nothing
    }
  };

  const deleteComment = async commentId => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${match.params.postId}/comments?id=${commentId}`,
      {
        method: "DELETE"
      }
    );
    const postComments = await data.json();
    setCommentCount(postComments.length);
    setComments(postComments);
  };

  const deletePost = () => {};

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
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>

      <h5 style={{ marginTop: 50 }}>Comments ({commentCount})</h5>

      {comments.map(comment => (
        <Card
          bg="secondary"
          border="light"
          style={{ marginTop: 10 }}
          key={comment.id}
        >
          <Card.Body>
            <Card.Title style={{ textTransform: "capitalize", color: "wheat" }}>
              {comment.name}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <i style={{ color: "silver" }}>{comment.email}</i>
            </Card.Subtitle>
            <Card.Text style={{ color: "white" }}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link
              style={{ color: "darkblue", cursor: "pointer" }}
              onClick={() => {
                alert("edit");
              }}
            >
              Edit
            </Card.Link>
            <Card.Link
              style={{ color: "maroon", cursor: "pointer" }}
              onClick={() => deleteConfirm("comment", comment.id)}
            >
              Delete
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Post;
