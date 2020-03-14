import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import NavigationBar from "./components/NavigationBar";
// import Album from "./pages/Album";
// import Post from "./pages/Post";
// import PostList from "./pages/PostList";
import UserList from "./pages/UserList";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={UserList} />
          {/* <Route path="/album/:countryId" component={Competition} />
          <Route path="/clubs/:competitionId" component={Clubs} />
          <Route path="/club-profile/:clubId" component={ClubProfile} />
          <Route path="/player-profile/:playerId" component={PlayerProfile} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
