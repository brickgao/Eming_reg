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
        email = req.body.email,
        reg = RegExp('\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*');
    if(username === '') {
      req.flash('error', '没有用户名是不行的哟_(:з」∠)_');
      return res.redirect('/');
    }
    if(passwd === '') {
      req.flash('error', '没有密码是不行的哟_(:з」∠)_');
      return res.redirect('/');
    }
    if(email === '') {
      req.flash('error', '没有电子邮件是不行的哟_(:з」∠)_');
      return res.redirect('/');
    }
    if(reg.test(email) === false) {
      req.flash('error', '电子邮件不符合格式呐，快检查_(:з」∠)_');
      return res.redirect('/');
    }
    if(username != '' && passwd != '' && email != '' && reg.test(email)) {
      var whuconnect = require('../models/whuconnect.js');
      var con = new whuconnect(username, passwd, email);
      con.login(function (flag, cookie) {
        if(flag === true) {
          con.getinfo(cookie, function(info) {
            var user_db = require('../models/user_db.js');
            var user = new user_db(info);
            user.find(function(err, doc) {
              if(err) {
                req.flash('error', err + '\n系统错误，请联系管理员');
                return res.redirect('/');
              }
              else {
                if(doc) {
                  user.update(function(err) {
                    if(err) {
                      req.flash('error', err + '\n系统错误，请联系管理员');
                      return res.redirect('/');
                    }
                    else {
                      req.flash('success', user.info.name + '，报名信息更新成功了哟~');
                      return res.redirect('/');
                    }
                  });
                }
                else {
                  user.insert(function(err, collection) {
                    if(err) {
                      req.flash('error', err + '\n系统错误，请联系管理员');
                      return res.redirect('/');
                    }
                    else {
                      req.flash('success', user.info.name + '，报名成功了哟～');
                      return res.redirect('/');
                    }
                  });
                }
              }
            });
          });
        }
        else {
          req.flash('error', '登录错误了哦，快检查用户名或者密码_(:з」∠)_');
          return res.redirect('/');
        }
      });
    }
  });
  
  app.get('/login', function(req, res) {
    res.render('login', {
      title: '管理界面',
      admin: req.session.admin,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

  app.post('/login', function(req, res) {
    var crypto = require('crypto'),
        adminuser = require('../models/admin_db.js'),
        md5 = crypto.createHash('md5'),
        passwd = md5.update(req.body.passwd).digest('hex'),
        admin = new adminuser();
    admin.find(function(err, adminpasswd) {
      if(err) {
        req.flash('error', '出现错误:\n' + err);
        return res.redirect('/login');
      }
      else {
        if(adminpasswd === passwd) {
          req.session.admin = 'login';
          req.flash('success', '登录成功');
          return res.redirect('/manage');
        }
        else {
          req.flash('error', '密码错误');
          return res.redirect('/login');
        }
      }
    });
  });

  app.get('/manage', function(req, res) {
    if(!req.session.admin) {
      req.flash('error', '请登录');
      return res.redirect('/login');
    }
    else {
      var output_db = require('../models/output_db.js');
          output = new output_db();
      output.getall(function(err, docs) {
        if (err) {
          req.flash('error', '出现错误:\n' + err);
          return res.redirect('/');
        }
        res.render('manage', {
          title: '管理界面',
          docs: docs,
          admin: req.session.admin,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        });
      });
    }
  });

  app.post('/manage', function(req, res) {
    req.session.admin = null;
    req.flash('success', '退出成功');
    return res.redirect('/login');
  });

  app.post('/list', function(req, res) {
  }
}
