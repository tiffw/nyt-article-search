import React, { Component } from "react";
import helpers from "../utils/helpers";
import moment from "moment";

export default class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.renderNoBookmarks = this.renderNoBookmarks.bind(this);
    this.renderBookmarks = this.renderBookmarks.bind(this);
  }
  componentDidMount() {
    helpers.getBookmarks().then(function(res) {
      // only updates if any saved articles are found
      if (res.data.length > 0) {
        this.setState({ bookmarks: res.data });
      };
    }.bind(this));
  }
  handleClick(article) {
    helpers.deleteBookmark(article)
    .then(function() {
      helpers.getBookmarks().then(function(res) {
        this.setState({ bookmarks: res.data });
      }.bind(this));
    }.bind(this));
    alert("You deleted a bookmark!");
  }
  renderNoBookmarks() {
    return (
      <li className="list-group-item">
        <h3 className="text-center"><em>You have no articles bookmarked.</em></h3>
      </li>
    )
  }
  renderBookmarks() {
    return this.state.bookmarks.map(function(article, index) {
      return (
        <li className="list-group-item" key={index}>
          <h3>
            <button className="btn btn-primary pull-right" onClick={() => this.handleClick(article)}>
              <i className="fa fa-remove" aria-hidden="true"></i>
            </button>
            <a href={article.url} rel="noopener noreferrer" target="_blank">
              <em>{article.title}</em>
            </a>
          </h3>
          <p><em>{moment(article.pub_date).format('MMMM D, YYYY')}</em></p>
        </li>
      )
    }.bind(this));
  }
  render() {
    return (
      <div className="bookmarks-wrapper">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <strong>
                    <i className="fa fa-bookmark" aria-hidden="true"></i>&nbsp;
                    Bookmarks
                  </strong>
                </h3>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.state.bookmarks.length === 0 ? this.renderNoBookmarks() : this.renderBookmarks()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
