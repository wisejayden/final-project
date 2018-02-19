const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
// const credenentials = require('./credentials.json');
// var accessId = credenentials.access_id;
const vbb = require('vbb-client')

app.use(express.static('public'));

app.get('/', function(req, res) {
});

app.get('/find-route', function(req, res) {
    
})








app.listen(8080, () => console.log("Listening on port 8080"));
