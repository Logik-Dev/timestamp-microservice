
const express = require('express');
const app = express();
const path = require('path');

app.use('/static',express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.get('/api/timestamp', (req, res) => {
    // the user did not pass date
    let date = new Date();
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    })
})
app.get('/api/timestamp/:date_string', (req, res) => {
    let userInput = req.params.date_string;
    // if date_string parameter is unix timestamp convert it to integer
    const regex = RegExp('^[0-9]+$');
    if(regex.test(userInput)) userInput = parseInt(userInput);

    const dateString = new Date(userInput);
    // if the date is invalid respond Invalid Date
    if(dateString == "Invalid Date"){
        res.json({error: "Invalid Date"});
    }
    // else respond with unix and utc
    else {
        res.json({
            unix: dateString.getTime(), 
            utc: dateString.toUTCString()});
    }
})


app.listen(3000, () => {
    console.log("Server listening on port 3000");
})