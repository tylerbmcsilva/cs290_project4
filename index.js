var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 12017);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  var qParams = [];
  for(var p in req.query){
    qParams.push({'name':p,'value':req.query[p]});
  }
  var context = {
    dataList: qParams,
    requestType: 'GET'
  };
  res.render('index', context);
});

app.post('/', function(req,res){
  var qParams = [];
  var rParams = [];
  console.log(req);
  for(var p in req.body){
    qParams.push({'name':p,'value':req.body[p]});
  }
  var context = {
    dataList: qParams,
    requestList: rParams,
    requestType: 'POST'
  }
  res.render('index', context);
})

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
