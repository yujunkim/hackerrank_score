var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');
var _und = require('underscore');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var initValue = {
    yujunkim: 176,
    yeongjinc: 193,
    gonghackerrank: 111,
    junsangs: 101
  }
  raw = []
  _und.each(initValue, function(initV, username){
    var url = "https://www.hackerrank.com/rest/hackers/" + username + "/hackos"
    request(url, function(error, response, html){
      j = JSON.parse(html)
      raw.push([username, initV, j])
    })
  })
  setTimeout(function(){
    all = _und.sortBy(raw, function(l){
      gross = parseInt(l[2].gross);
      return -(gross - l[1]);
    })

    res.render("index", {all: all});
  },2000)
});

module.exports = router;
