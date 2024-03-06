// Create web server
// Run: node comments.js

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var server = http.createServer(function (req, res) {
    var uri = url.parse(req.url);
    if (uri.pathname === '/comments' && req.method === 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var params = qs.parse(body);
            console.log(params['name']);
            console.log(params['comment']);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.write('Name: ' + params['name'] + '\n');
            res.write('Comment: ' + params['comment']);
            res.end();
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('Hello World!');
        res.end();
    }
});
server.listen(8080);
console.log('Server is running at http://localhost:8080/');