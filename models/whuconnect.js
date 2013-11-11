function whuconnect(username, passwd, phonenum) {
  this.username = username;
  this.passwd = passwd;
  this.phonenum = phonenum;
}

module.exports = whuconnect;

whuconnect.prototype.login = function login(callback) {
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
    var result = '',
        resData = '',
        headers = res.headers,
        cookies = headers['set-cookie'];
    res.setEncoding('utf8');
    req.write(contents);
    cookies.forEach(function(cookie) {
      result += cookie.replace(/path=\//g,'');
    });
    res.on('data', function(data) {
      resData += data
    });
    res.on('end', function() {
      return callback(result);
    });
  });
  req.write(contents);
  req.end();
}

whuconnect.prototype.getinfo = function getinfo(cookie, callback) {
  var http = require('http');
  var options = {
    host: 'my.whu.edu.cn',
    port: 80,
    path: '/index.portal',
    method: 'get',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/\*;q=0.8',
      'Accept-Encoding': 'gzip,deflate,sdch',
      'Accept-Language': 'zh-CN,zh;q=0.8',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'my.whu.edu.cn',
      'Origin': 'http://my.whu.edu.cn',
      'Referer': 'http://my.whu.edu.cn/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36',
      'Cookie': cookie
    }
  };
  var req = http.get(options, function(res) {
    var pageData = '';
    res.setEncoding('UTF-8');
    res.on('data', function(chunk) {
      pageData += chunk;
    });
    res.on('end', function() {
      var reg1 = RegExp('<li>工号：(.+?)</li>'),
          reg2 = RegExp('<li>部门：(.+?)</li>'),
          reg3 = RegExp('<li>\s*(.+?)\s*<script>', 'm'),
          id = pageData.match(reg1)[1],
          college = pageData.match(reg2)[1],
          name = pageData.match(reg3)[1],
          grade = id[0] + id[1] + id[2] + id[3] + '级';
      var info = {
        name: name,
        id: id,
        college: college,
        grade: grade,
        phonenum: this.phonenum
      }
      console.log(info);
    });
  });
}
