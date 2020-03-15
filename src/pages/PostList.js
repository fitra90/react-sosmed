import React, { useState, useEffect } from "react";
import { Table, Breadcrumb, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash, FaPen } from "react-icons/fa";

function PostList({ match }) {
  useEffect(() => {
    getPostList();
  }, []);

  const [postList, setPostList] = useState([]);

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
  };

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
                <Link to={"/post/edit/" + post.id}>
                  <Button
                    variant="info"
                    onClick={() => {
                      alert("edit me");
                    }}
                  >
                    <FaPen style={{ marginBottom: 3 }} /> Edit
                  </Button>
                </Link>
                &nbsp;
                <Button
                  variant="danger"
                  onClick={() => {
                    alert("delete me");
                  }}
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

export default PostList;
