import React, { useState, useEffect } from "react";
import { Table, Breadcrumb, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash, FaPen } from "react-icons/fa";

function AlbumList({ match }) {
  useEffect(() => {
    getAlbumList();
  }, []);

  const [albumList, setAlbumList] = useState([]);

  const getAlbumList = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/albums?userId=${match.params.userId}`,
      {
        headers: { "Content-type": "text/json" }
      }
    );
    const items = await data.json();
    // console.log(items);
    setAlbumList(items);
  };

  return (
    <div className="container">
      <Breadcrumb style={{ marginTop: 10 }}>
        <Breadcrumb.Item>
          <Link to="/">User List</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Album of {match.params.userName}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Table hover>
        <thead>
          <tr>
            <th>Album Title </th>
          </tr>
        </thead>
        <tbody>
          {albumList.map(album => (
            <tr key={album.id}>
              <td>
                <Link
                  to={"/album/" + album.id}
                  style={{ textTransform: "capitalize" }}
                >
                  {album.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AlbumList;
