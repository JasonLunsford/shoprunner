const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const JsonDB = require('node-json-db');

// Enable express and CORS
const app = express();
app.use(cors());

// Parse incoming query strings and POST messages, convert into JSON
app.use(bodyParser.urlencoded({
	extended       : false,
    parameterLimit : 100000,
    limit          : '50mb'
}));
app.use(bodyParser.json());

// Prepare routes
let index = require('./routes/index');
let coreApis = require('./routes/coreApis');

// Use routes
app.use('/', index);
app.use('/shoprunner', coreApis);

// Global failure route
app.all('/*', (req, res) => {
	res.status(500).send({status: 500, error: 'Invalid endpoint'});
});

// Catch random UnhandledRejection
process.on('unhandledRejection', error => {
    console.log('unhandledRejection: ', error.message);
});

app.listen(8181);
