// What is axios? - Promise based HTTP client for the browser and node.js
// Send async HTTP request to REST endpoints and perform CRUD operations
// XMLHttpRequest
import axios from "axios";

// NYT API key
// https://developer.nytimes.com/signup
var apikey = "1a2e647b3419420db72c186861a5c8db";

const helpers = {

  runQuery: function(topic, startYr, endYr) {

    // cleans up format of search terms
    var q = topic.trim();
    var begin_date = startYr.trim() + "0101";
    var end_date = endYr.trim() + "1231";

    // runs search query
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
      params: {
        "apikey": apikey,
        "q": q,
        "begin_date": begin_date,
        "end_date": end_date
      }
    }).then(function(res) {
      console.log("--- RUNS QUERY ---");
      console.log(res.data.response);
      return res.data.response;
    }).catch(function(err) {
      console.log(err);
    });
  },

  getBookmarks: function() {
    return axios.get(
      '/api/bookmarks'
    ).then(function(res) {
      console.log("--- GETTING ALL BOOKMARKS ---" + " : " + res.data.length + " articles!");
      return res
    }).catch(function(err) {
      console.log(err);
    });
  },

  saveBookmark: function(article) {
    return axios.post('/api/bookmarks', {
      // formats nyt api data to store in db
      article_id: article._id,
      title: article.headline.main,
      url: article.web_url,
      pub_date: article.pub_date
    }).then(function(res) {
      console.log("--- BOOKMARK SAVED ---" + " : " + res.data.article_id);
    }).catch(function(err) {
      console.log(err);
    });
  },

  // NOTE: axios.delete() by itself does not work;
  // json needs to be specificied as the response type
  deleteBookmark: function(article) {
    return axios({
      method: 'delete',
      url: '/api/bookmarks',
      data: article,
      responseType: 'json'
    }).then(function(res) {
      console.log("--- BOOKMARK DELETED ---");
    }).catch(function(err) {
      console.log(err);
    });
  }

};

export default helpers;
