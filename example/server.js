var express = require('express');
var OSRM = require('../');

var app = express();
var osrm = new OSRM("berlin-latest.osrm");

// Accepts a query like:
// http://localhost:8888?start=52.519930,13.438640&end=52.513191,13.415852
app.get('/', function(req, res) {
    if (!req.query.start || !req.query.end) {
        return res.json({"error":"invalid start and end query"});
    }
    var coordinates = [];
    var start = req.query.start.split(',');
    coordinates.push([+start[0],+start[1]]);
    var end = req.query.end.split(',');
    coordinates.push([+end[0],+end[1]]);
    var query = {
        coordinates: coordinates,
        alternateRoute: req.query.alternatives !== 'false'
    };
    osrm.route(query, function(err, result) {
        if (err) return res.json({"error":err.message});
        return res.json(result);
    });
});

console.log('Listening on port: ' + 8888);
app.listen(8888);

