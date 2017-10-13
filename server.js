var express = require('express');
var path = require('path');
require('dotenv').config();
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static('server/public'));

// Using requst module to make HTTP requests from the server
// https://www.npmjs.com/package/request
var request = require('request');

var baseUrl = "http://api.brewerydb.com/v2";
var search = "/search?q=";
var beer = "Darkness";
var brewery = 'Surly';
// var type = "&type=beer";
var type = "&type=brewery";
var keyHead = "&key=";
var key = process.env.API_KEY;
var withBreweries = '&withBreweries=y';
// var fullUrl = baseUrl + search + beer + type + withBreweries + keyHead + key;
var fullUrl = baseUrl + search + brewery + type + withBreweries + keyHead + key;

app.use(express.static('public'));

app.get('/brewery', function (req, res) {
    request(fullUrl, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode: ', response && response.statusCode); // Print the response status code if a response was received
        console.log('body: ', body); // Print the HTML for the Google homepage.

        res.status(200).send(JSON.parse(body));         
    })
})





app.listen(port, function () {
    console.log('localhost running on port', port);
});