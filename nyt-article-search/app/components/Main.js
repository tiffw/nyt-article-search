import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Bookmarks from "./Bookmarks";

export default class Main extends Component {
  render() {
    return (
      <main className="container">

        {/* Navbar */}
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-ex1-collapse"
                >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">NYT Article Search</Link>
            </div>
            <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/search">
                    <i className="fa fa-search" aria-hidden="true"></i>&nbsp;
                    Search
                  </Link>
                </li>
                <li>
                  <Link to="/bookmarks">
                    <i className="fa fa-bookmark" aria-hidden="true"></i>&nbsp;
                    Bookmarks
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Jumbotron */}
        <div className="jumbotron text-center">
          <h3><em>Search for and save news articles of interest</em></h3>
        </div>

        {/* Children Components */}
        {this.props.children}

        {/* Footer */}
        <footer>
          <hr />
        </footer>

      </main>
    );
  }
}
