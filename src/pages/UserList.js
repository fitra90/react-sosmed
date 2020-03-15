import React, { useState, useEffect } from "react";
import { Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaBookOpen, FaCameraRetro } from "react-icons/fa";
import Loading from "./../components/Loading";

function UserList() {
  useEffect(() => {
    getUserList();
  }, []);

  const [userList, setUserList] = useState([]);
  const [stillLoading, setStillLoading] = useState(true);

  const getUserList = async () => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      headers: { "Content-type": "text/json" }
    });
    const items = await data.json();
    // console.log(items);
    setUserList(items);
    setStillLoading(false);
  };

  if (stillLoading) {
    return <Loading />;
  } else {
    return (
      <div className="container">
        <Breadcrumb style={{ marginTop: 10 }}>
          <Breadcrumb.Item active>User List</Breadcrumb.Item>
        </Breadcrumb>

        <Table hover>
          <thead>
            <tr>
              <th>Name </th>
              <th>Address </th>
              <th>Website </th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {userList.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={"/user/" + user.id}>{user.name}</Link>
                </td>
                <td>
                  <p>
                    {user.address.street}, {user.address.suite}, &nbsp;
                    {user.address.city} {user.address.zipcode}
                  </p>
                </td>
                <td>
                  <a
                    href={"http://" + user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.{user.website}
                  </a>
                </td>
                <td>
                  <Link to={"/post-list/" + user.id + "/" + user.name}>
                    <Button variant="primary">
                      <FaBookOpen style={{ marginBottom: 3 }} /> View Posts
                    </Button>
                  </Link>
                  &nbsp;
                  <Link to={"/album-list/" + user.id + "/" + user.name}>
                    <Button variant="danger">
                      <FaCameraRetro style={{ marginBottom: 3 }} /> View Albums
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default UserList;
