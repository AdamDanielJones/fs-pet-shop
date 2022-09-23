// set up dependencies
const response = require('express');
const express = require('express');
const app = express();
const fs = require('fs');


// handle requests with routes
app.get('/pets', function(req, res) {
    fs.readFile('./pets.json', 'utf-8', function(error, pets){
        if(error){
            console.log(error);
            res.status(500);
            res.send(error);
        }else{
            res.send(JSON.parse(pets))
        }
        })
})

app.listen(8002, function(){
    console.log('server running');
})