import React, { useState, useEffect } from "react";
import { Table, Breadcrumb, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBookOpen, FaCameraRetro } from "react-icons/fa";

function User({ match }) {
  useEffect(() => {
    getUser();
  }, []);

  const [user, setUser] = useState([]);
  const [phone, setPhone] = useState([]);
  const [company, setCompany] = useState([]);
  const [address, setAddress] = useState([]);

  const getUser = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/users?id=${match.params.userId}`,
      {
        headers: { "Content-type": "text/json" }
      }
    );
    let items = [];
    items = await data.json();
    setUser(items[0]);
    setCompany(items[0].company);
    setAddress(items[0].address);
    const rawPhone = items[0].phone;
    const phoneRaw = rawPhone.split(" ");
    setPhone(phoneRaw[0]);
  };

  const phoneFixer = phone => {
    var res = phone.split(" ");
    return res[0];
  };

  return (
    <div className="container">
      <Breadcrumb style={{ marginTop: 10 }}>
        <Breadcrumb.Item href="/">User List</Breadcrumb.Item>
        <Breadcrumb.Item active>User Profile</Breadcrumb.Item>
      </Breadcrumb>
      <Table hover style={{ marginTop: 10 }}>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{user.name}</td>
          </tr>
          <tr>
            <th>Username</th>
            <td>{user.username}</td>
          </tr>
          <tr>
            <th>E-Mail</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{phone}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              {address.street}, {address.suite}, &nbsp;
              {address.city} {address.zipcode}
            </td>
          </tr>
          <tr>
            <th>Company</th>
            <td>{company.name}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              <Link to={"http://www." + user.website}>www.{user.website}</Link>
            </td>
          </tr>
          <tr>
            <th>&nbsp;</th>
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
        </tbody>
      </Table>
    </div>
  );
}

export default User;
