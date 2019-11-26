var express = require('express');
var router = express.Router();
var request = require('request');

const rootURL = 'https://api.github.com/';

// "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
//process.env.varName is how we access the values in our .env

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {userData: null});
});

router.post('/', function(req, res) {
  var options = {
    url: `${rootURL}users/${req.body.username}`,
    headers: {
      'User-Agent': 'SpiffyTheSpaceman',
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  };
  request(options,
  function(err, response, body) {
    //body stores the JSON received from option.
    var userData = JSON.parse(body);
    options.url = userData.repos_url;
    request(options, function(err, response, body) {
      userData.repos = JSON.parse(body);
      res.render('index', {userData});
    })
  });
});

module.exports = router;
