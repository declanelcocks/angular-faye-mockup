var http = require('http'),
  express = require('express'),
  bodyParser = require('body-parser'),
  faye = require('faye');

var bayeux = new faye.NodeAdapter({
  mount: '/faye',
  timeout: 45
});

var app = express();
var server = http.createServer(app);
bayeux.attach(server);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express['static'](__dirname + '/public'));

app.post('/message', function(req, res) {
  bayeux.getClient().publish('/channel', {
    text: req.body.message
  });
  console.log('broadcast message:' + req.body.message);
  res.send(200);
});

server.listen(8181);
