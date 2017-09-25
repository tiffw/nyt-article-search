import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Main from "./components/Main";
import Search from "./components/Search";
import Bookmarks from "./components/Bookmarks";

const Routes = (props) => (
  <Router {...props}>
    <Main>
      <Route exact path="/" component={Search} />
      <Route path="/search" component={Search} />
      <Route path="/bookmarks" component={Bookmarks} />
    </Main>
  </Router>
);

export default Routes;
