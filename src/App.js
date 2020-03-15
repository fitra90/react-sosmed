import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import NavigationBar from "./components/NavigationBar";
import Album from "./pages/Album";
import AlbumList from "./pages/AlbumList";
import User from "./pages/User";
import UserList from "./pages/UserList";
import PostList from "./pages/PostList";
import Post from "./pages/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route path="/post-list/:userId/:userName" component={PostList} />
          <Route path="/post/:postId/:userName" component={Post} />
          <Route path="/album-list/:userId/:userName" component={AlbumList} />
          <Route
            path="/album/:albumId/:userName/:albumName/:userId"
            component={Album}
          />
          <Route path="/user/:userId" component={User} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
