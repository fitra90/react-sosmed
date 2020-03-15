import React, { useState, useEffect } from "react";
import { Table, Breadcrumb, Modal, Button } from "react-bootstrap";
import Loading from "./../components/Loading";

function Album({ match }) {
  useEffect(() => {
    getAlbum();
  }, []);

  const [album, setAlbum] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState(false);
  const [imageLarge, setImageLarge] = useState([]);
  const [stillLoading, setStillLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = (url, title) => {
    setShow(true);
    setImageLarge([url, title]);
  };

  const getAlbum = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${match.params.albumId}`,
      {
        headers: { "Content-type": "text/json" }
      }
    );
    const items = await data.json();

    setPhotos(items);
    setAlbum(items[0]);
    setStillLoading(false);
  };

  if (stillLoading) {
    return <Loading />;
  } else {
    return (
      <div className="container">
        <Breadcrumb style={{ marginTop: 10 }}>
          <Breadcrumb.Item href="/">User List</Breadcrumb.Item>
          <Breadcrumb.Item
            href={
              "/album-list/" + match.params.userId + "/" + match.params.userName
            }
          >
            Album of {match.params.userName}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Album Data</Breadcrumb.Item>
        </Breadcrumb>

        <Table>
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
                    onClick={() => {
                      handleShow(photo.url, photo.title);
                    }}
                    key={photo.id}
                    alt={photo.caption}
                    src={photo.thumbnailUrl}
                    style={{
                      cursor: "pointer",
                      margin: 5
                    }}
                  />
                ))}
              </td>
            </tr>
          </tbody>
        </Table>

        <Modal show={show} size="lg" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{imageLarge[1]}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ alignSelf: "center" }}>
            <img src={imageLarge[0]} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Album;
