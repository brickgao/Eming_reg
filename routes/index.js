module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {
      title: 'E鸣杯报名页面'
    })
  });

  app.post('/', function(req, res) {
  });

  app.post('/manage', function(req, res) {
  });
}
