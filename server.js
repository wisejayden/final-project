const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {

});

app.get('/find-route', function(req, res) {

})








app.listen(8080, () => console.log("Listening on port 8080"));
