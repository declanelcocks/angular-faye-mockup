var http          = require('http'),
    express       = require('express'),
    bodyParser    = require('body-parser'),
    faye          = require('faye'),
    app           = express(),
    server        = http.createServer(app);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express['static'](__dirname + '/public'));

var ws = new faye.NodeAdapter({
  mount: '/faye',
  timeout: 45
});

ws.attach(server);

app.post('/message', function(req, res) {
  ws.getClient().publish('/channel', {
    text: req.body.message
  });
  console.log('broadcast message:' + req.body.message);
  res.send(200);
});

app.get('/', function(req, res) {
  res.send(200).status({message: 'hi mate, you have hit the root route'});
});

var port = process.env.PORT || 8181;
server.listen(port, function() {
  console.log('Express server listening on port ' + port);
});