var express = require('express')
var bodyParser = require("body-parser");
var app = express()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('myDB');

app.use(express.static('public'))
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));

db.serialize(function(req, res, next) {
        
    let username = req.body.name;
    let password = req.body.password;
    let comment = req.body.comment;
    let radio = req.body.optradio;

    db.run("CREATE TABLE IF NOT EXISTS User (name TEXT, password TEXT, comment TEXT, option TEXT)");
    db.run("DELETE FROM users");
    db.run(`INSERT INTO users VALUES  ("${req.body.name}")`);
    db.run(`INSERT INTO users VALUES ("${req.body.password}")`);
    db.run(`INSERT INTO users VALUES ("${req.body.comment}")`);
    db.run(`INSERT INTO users VALUES ("${req.body.optradio}")`);

    db.each("SELECT * FROM users", function(err, row) {
        console.log("Name: " + row.name + "  Password: " + row.password + "Comment: " + row.Comment + "Option: " + row.option); 
    });
});

db.close();