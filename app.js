const express = require('express');
const app = express();
const morgan = require('morgan');


const parkingRoutes = require('./api/routes/parkings');

app.use(morgan('dev'));

//Routes handling requests
app.use('/parkings', parkingRoutes);

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