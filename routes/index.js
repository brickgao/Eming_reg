module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {
      title: 'Eming杯报名页面',
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

  app.post('/req', function(req, res) {
    var username = req.body.username,
        passwd = req.body.passwd,
        phonenum = req.body.phonenum;
    if(username === '') {
      req.flash('error', '没有用户名是不行的哟_(:з」∠)_');
      return res.redirect('/');
    }
    if(passwd === '') {
      req.flash('error', '没有密码是不行的哟_(:з」∠)_');
      return res.redirect('/');
    }
    if(phonenum === '') {
      req.flash('error', '没有电话是不行的哟_(:з」∠)_');
      return res.redirect('/');
    }
    if(isNaN(phonenum) === true) {
      req.flash('error', '电话怎么不是数字呐，快检查_(:з」∠)_');
      return res.redirect('/');
    }
    if(username != '' && passwd != '' && phonenum != '' && isNaN(phonenum) === false) {
      var whuconnect = require('../models/whuconnect.js');
      var con = new whuconnect(username, passwd, phonenum);
      con.login(function (flag, cookie) {
        if(flag === true) {
          con.getinfo(cookie, function(info) {
            s = info.name + '，报名成功了哟~';
            req.flash('success', s);
            return res.redirect('/');
          });
        }
        else {
          req.flash('error', '登录错误了哦，快检查用户名或者密码_(:з」∠)_');
          return res.redirect('/');
        }
      });
    }
  });
  
  app.post('/manage', function(req, res) {
  });
}
