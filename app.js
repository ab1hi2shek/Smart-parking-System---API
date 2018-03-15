const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const parkingRoutes = require('./api/routes/parkings');
const shortestDistanceRoutes = require('./api/routes/shortestDistance');
const ourAlgorithmRoutes = require('./api/routes/ourAlgorithm');

//using mongoose
var url = 'mongodb://abhishek:' + process.env.MONGO_ATLAS_PW + '@sps-node-rest-api-shard-' + 
    '00-00-n5dll.mongodb.net:27017,sps-node-' + 
    'rest-api-shard-00-01-n5dll.mongodb.net:27017,sps-node-rest-api-shard-00-02-' + 
    'n5dll.mongodb.net:27017/test?ssl=true&replicaSet=SPS-node-rest-api-shard-0&authSource=admin';

mongoose.connect(url, {
  useMongoClient: true
});

//using middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});


//Routes handling requests
app.use('/parkings', parkingRoutes);
app.use('/shortest-dist', shortestDistanceRoutes);
app.use('/our-algo', ourAlgorithmRoutes);

app.use((req, res, next) => {
	const error = new Error('Page not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;