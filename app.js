var express = require('express');
var connect = require('connect');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

// var port = process.env.PORT || 8080;

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*app.use(express.static(__dirname + '/public'));
app.use(connect.cookieParser());
app.use(connect.logger('dev'));
app.use(connect.bodyParser());o

app.use(connect.json());
app.use(connect.urlencoded());*/

// Routess

// require('./routes.js')(app);;

// module.exports = function(app) {


app.get('/', function (req, res)
{
    res.end("Node-File-Upload");

});
app.post('/upload', function (req, res) {
    console.log(req.files.image.originalFilename);
    console.log(req.files.image.path);
    fs.readFile(req.files.image.path, function (err, data) {
        var dirname = "/home/rajamalw/Node/file-upload";
        var newPath = dirname + "/uploads/" + req.files.image.originalFilename;
        fs.writeFile(newPath, data, function (err) {
            if (err) {
                res.json({'response': "Error"});
            } else {
                res.json({'response': "Saved"});
            }
        });
    });
});


app.get('/uploads/:file', function (req, res) {
    file = req.params.file;
    var dirname = "/home/rajamalw/Node/file-upload";
    var img = fs.readFileSync(dirname + "/uploads/" + file);
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(img, 'binary');

});

app.listen(process.env.PORT || 8080, function()
{
    console.log('listening on: 8080')
});

// app.listen(port);
// console.log('The App runs on port ' + port);