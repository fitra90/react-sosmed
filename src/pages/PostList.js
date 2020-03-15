import React, { useState, useEffect } from "react";
import { Table, Breadcrumb, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Loading from "./../components/Loading";

function PostList({ match }) {
  useEffect(() => {
    getPostList();
  }, []);

  const [postList, setPostList] = useState([]);
  const [stillLoading, setStillLoading] = useState(true);
  const getPostList = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${match.params.userId}`,
      {
        headers: { "Content-type": "text/json" }
      }
    );
    const items = await data.json();
    // console.log(items);
    setPostList(items);
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
    if (data.status == 200) {
      alert("Post has been deleted!");

      let newPostList = postList.filter(post => post.id != deletePostId);
      console.log(newPostList);
      setPostList(newPostList);
    } else {
      alert("Error deleting post!");
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

        <Table hover>
          <thead>
            <tr>
              <th>Post Title </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {postList.map(post => (
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
      </div>
    );
  }
}

export default PostList;
