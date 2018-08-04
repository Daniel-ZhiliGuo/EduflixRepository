var express = require('express')
var bodyParser = require("body-parser");
var app = express()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('myDB');

app.use(express.static('public'))
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));


// REST endpoint for posting a new user
app.post('/users', function (req, res, next) {

    //insert the form data into the table User
    var stmt = db.run(`INSERT INTO User VALUES ("${req.body.name}", "${req.body.password}", "${req.body.comment}", "${req.body.optradio}")`);

    // still display the default web page in public folder, i.e. index.html, for next data entering 
    res.status(200).redirect('/');  
});

// REST endpoint for getting all user data
app.get('/users', function (req, res) {
    
    // Display a web page table
    res.write('<html><body>');
    res.write("<h3> The User Information Table </h3>");
    res.write("<table><tr style='background-color:#006633'>");
    res.write('<th width="150" style="color:#ffff99">Name</th>');
    res.write('<th width="150" style="color:#ffff99">Password</th>');
    res.write('<th width="150" style="color:#ffff99">Comment</th><tr>');
    res.write('<th width="150" style="color:#ffff99">Optradio</th><tr>');

    // Retrieve data from table User on the server 
    // and display it in a web page table structure
    db.all('SELECT * FROM users', function(err, rows){
        rows.forEach(function (row){
            res.write('<tr style="background-color:#ccffcc">');
            res.write('<td width="150" align="center">'+row.name+'</td>');
            res.write('<td width="150" align="center">'+row.password+'</td>');
            res.write('<td width="150" align="center">'+row.Comment+'</td></tr>');
            res.write('<td width="150" align="center">'+row.option+'</td></tr>');
        });
        res.write('</table>');
        res.write('</body></html>');
        res.send();
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})


