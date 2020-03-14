import React, { useState, useEffect } from "react";
import { Table, Breadcrumb, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "react-images";

function Album({ match }) {
  useEffect(() => {
    getAlbum();
  }, []);

  const [album, setAlbum] = useState([]);
  const [photos, setPhotos] = useState([]);
  //   let photos = [];

  const getAlbum = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${match.params.albumId}`,
      {
        headers: { "Content-type": "text/json" }
      }
    );
    const items = await data.json();
    // console.log(items);
    // setPhotos(items);

    console.log(items);

    // items.map(photo => {
    //     photos.push({
    //         src: photo.url,
    //         caption:photo.title,
    //         thumbnail:photo.thumbnailUrl
    //     });
    // });
    setPhotos(items);

    // console.log(photos)
    setAlbum(items[0]);
  };

  const images = [
    { src: "path/to/image-1.jpg" },
    { src: "path/to/image-2.jpg" }
  ];

  //   console.log(album);
  return (
    <div className="container">
      <Breadcrumb style={{ marginTop: 10 }}>
        <Breadcrumb.Item href="/">User List</Breadcrumb.Item>
        <Breadcrumb.Item
          href={"/album-list/" + photos + "/" + match.params.userName}
        >
          Album of {match.params.userName}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Album Data</Breadcrumb.Item>
      </Breadcrumb>

      <Table hover>
        <thead>
          <tr>
            <th style={{ textTransform: "capitalize" }}>
              Album : {match.params.albumName}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {photos.map(photo => (
                <img
                  key={photo.id}
                  alt={photo.caption}
                  src={photo.thumbnailUrl}
                  style={{
                    cursor: "pointer",
                    // position: "absolute",
                    margin: 5,
                    // maxWidth: "100%"
                  }}
                />
              ))}
            </td>
          </tr>
          {/* {album.map(myAlbum => (
            <tr key={myAlbum.id}>
              <td>
                <Link
                  to={"/myAlbum/" + myAlbum.id}
                  style={{ textTransform: "capitalize" }}
                >
                  {myAlbum.title}
                </Link>
              </td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </div>
  );
}

export default Album;

const gutter = 2;

const Gallery = () => (
  <div
    style={{ overflow: "hidden", marginLeft: -gutter, marginRight: -gutter }}
  />
);

const Image = () => (
  <div
    style={{
      backgroundColor: "#eee",
      boxSizing: "border-box",
      float: "left",
      margin: gutter,
      overflow: "hidden",
      paddingBottom: "16%",
      position: "relative",
      width: `calc(25% - ${gutter * 2}px)`,

      ":hover": {
        opacity: 0.9
      }
    }}
  />
);
