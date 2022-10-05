const express = require('express');
const app = express();
const fs = require('fs');

app.get('/pets', function(req, res){
    fs.readFile('./pets.json', 'utf-8', function(error, petsfile){
        if(error){
            console.log(error)
            res.status(500)
            res.send(error)
        }else {
            res.status(200)
            res.send(JSON.parse(petsfile))

        }
    })
})

app.get('/pets/0', function(req, res){
    fs.readFile('./pets.json', 'utf-8', function(error, petsfile){


        if(error){
            console.log(error)
            res.status(500)
            res.send(error)

        }else {
            var firstPet = JSON.parse(petsfile)
            var firstPetString = JSON.stringify(firstPet[0])
            var parsedPets = JSON.parse(firstPetString)
            res.status(200)
            res.send(parsedPets)

        }
    })
})
app.get('/pets/1', function(req, res){
    fs.readFile('./pets.json', 'utf-8', function(error, petsfile){
        var firstPet = JSON.parse(petsfile)
            var firstPetString = JSON.stringify(firstPet[1])
            var parsedPets = JSON.parse(firstPetString)

        if(error){
            console.log(error)
            res.status(500)
            res.send(error)

        }else {

            res.status(200)
            res.send(parsedPets)

        }
    })
})
app.post('pets/0', (req, res) =>{
    fs.writeFile('./pets.json', 'utf-8', function(error, petsfile){

    let newPet = req.body;
    console.log(newPet);
    if (error) {
        res.status(500)
        console.error("its not working")
    } else {
        petsfile.push(newPet)
    }
})
})




app.listen(8002, function(){
    console.log("server is running")
})