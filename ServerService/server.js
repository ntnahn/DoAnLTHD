var mongoose = require('mongoose');
var Express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var socketIOController = require('./server/socketIOController');

const listenPort = 8080;
const mongoDBName = 'BargBD';
const mongoURL ='mongodb://127.0.0.1:27017/'+mongoDBName;

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;
var dummyData = require('./server/dummyData');
mongoose.connect(mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  } else {
  	console.error(`Mongodb is running with DB name: ${mongoDBName}!`);
		// Insert dummy data
		dummyData();
  }
});

const app = new Express();
var pointRoute = require('./server/routes/point.routes.js');
var userRoute = require('./server/routes/user.routes.js');
// Use to receive json from body post method
app.use(bodyParser.json({ limit: '20mb' }));
// Use to make routes
app.use('/api', [pointRoute, userRoute]);
// Use client Folder as root asset
app.use('/', Express.static(path.resolve(__dirname, './public')));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var server = app.listen(listenPort, (error) => {
	if (!error) {
		console.log(`Barg service is running on port: ${listenPort}`);
	} else {
		console.log(`Barg service start failed, please check port: ${listenPort} already listened!`);
	}
});
var serverSocketIO = new socketIOController(server);
serverSocketIO.beginListen();
