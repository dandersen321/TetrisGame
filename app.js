/**
 * Created by kamaron on 4/2/15.
 */

var express = require('express'),
    fs = require('fs'),
    bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/high-scores', function (req, res) {
    fs.readFile(__dirname + '/database.json.db.txt', function (err, data) {
        if (err) {
            res.status(400).send(err);
        } else {
            try {
                res.send({'result': JSON.parse(data).d});
            } catch (e) {
                res.status(400).send(e);
            }
        }
    });
});

app.post('/api/high-scores', function (req, res) {
    fs.readFile(__dirname + '/database.json.db.txt', { encoding: 'utf-8' }, function (err,data) {
        if (err) {
            res.status(400).send(err);
        } else {
            try {
                console.log(data);
                var t = JSON.parse(data).d;
                t.push(req.body);
                t = t.sort(function (a, b) { return a.score < b.score; }).splice(0, 10);
                fs.writeFile(__dirname + '/database.json.db.txt', JSON.stringify({'d': t}), { encoding: 'utf-8' }, function (err) {
                    if (err) res.status(400).send(err);
                    else res.send({'success': true});
                });
            } catch (e) {
                res.status(400).send(e);
                console.log(e);
            }
        }
    });
});

app.listen(3000);

console.log('Listening on port 3000...');