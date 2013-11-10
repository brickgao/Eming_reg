function connect(username, passwd) {
  this.username = username;
  this.passwd = passwd;
}

module.exports = connect;

connect.prototype.login = function login(callback) {
  var http = require('http');
  var querystring = require('querystring');
  var contents = querystring.stringify({
    'Login.Token1': this.username,
    'Login.Token2': this.passwd,
    'goto': 'http://my.whu.edu.cn/loginSuccess.portal',
    'gotoOnFail': 'http://my.whu.edu.cn/loginFailure.portal'
  });
  var options = {
    host: 'my.whu.edu.cn',
    path: '/userPasswordValidate.portal',
    method: 'post',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/\*;q=0.8',
      'Accept-Encoding': 'gzip,deflate,sdch',
      'Accept-Language': 'zh-CN,zh;q=0.8',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'my.whu.edu.cn',
      'Origin': 'http://my.whu.edu.cn',
      'Referer': 'http://my.whu.edu.cn/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36'
    }
  };
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var headers = res.headers;
    res.on('data', function(data) {
    });
  });
  req.write(contents);
  req.end();
}

connect.prototype.getinfo = function getinfo(callback) {
    var http = require('http');
    var options = {
      host: 'my.whu.edu.cn',
      path: '/index.portal',
      method: 'get'
    };
    var req = http.get(options, function(res) {
      var pageData = "";
      res.setEncoding('UTF-8');
      res.on('data', function(chunk) {
        pageData += chunk;
      });
    });
}



