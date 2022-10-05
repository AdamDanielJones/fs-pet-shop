const PORT = 3000;
const { response } = require('express');
const express = require('express');
const app = express();
const {Client} = require('pg');
const config = require('./node_modules/config.json')[process.env.NODE_ENV||"dev"]

const client = new Client({
    connectionString: config.connectionString,
})

client.connect();

app.use(express.json());

app.get('/pets', (req, res)=> {

    client.query(`SELECT * FROM pets`)
    .then(result => {
        res.status(200)
        res.send(result.rows);
    })
})

app.get('/pets/:id', (req, res)=> {
    var input = req.params.id
    client.query(`SELECT * FROM pets WHERE pets_id=$1`, [input])
    .then(result => {
        res.status(200)
        res.send(result.rows);
    })
})

app.get('/pets/name/:name', (req, res)=> {
    var input = req.params.name
    client.query(`SELECT * FROM pets WHERE name=$1`, [`${input}`])
    .then(result => {
        res.status(200)
        res.send(result.rows);
    })
})

app.get('/pets/age/:age', (req, res)=> {
    var input = req.params.age
    client.query(`SELECT * FROM pets WHERE age=$1`, [`${input}`])
    .then(result => {
        res.status(200)
        res.send(result.rows);
    })
})


app.post('/pets/create', (req, res) => {
    var nameInput = req.body.name;
    var ageInput = req.body.age;
    var kindInput = req.body.kind;
    if (!nameInput || !ageInput || !kindInput){
        res.status(400)
        res.send('ERROR ~ Please provide all property inputs')
    }
    if (typeof ageInput !== 'number'){
        res.status(400)
        res.send('Age must be a number')
    }
    client.query(`INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3)`, [nameInput, ageInput, kindInput])
    .then(result => {
        res.status(200)
        res.send(result);
    })
})

app.patch('/pets/update/:id', (req, res) => {
    var petId = req.params.id;
    var nameInput = req.body.name;
    var ageInput = req.body.age;
    var kindInput = req.body.kind;
    if (ageInput != undefined && typeof ageInput !== 'number'){
        res.status(400)
        res.send('Age must be a number')
    }
    client.query(`UPDATE pets SET name = COALESCE($1, name), age = COALESCE($2, age), kind = COALESCE($3, kind) WHERE pets_id = $4`,[nameInput, ageInput, kindInput, petId])
    .then(result =>{
        res.status(200)
        res.send('Pet has been updated')
    })
})

app.delete('/pets/delete/:id', (req, res) => {
        var petId = req.params.id;
        client.query(`DELETE FROM pets WHERE pets_id = $1`, [petId])
        .then(result => {
            res.status(200)
            res.send('Deleted')})
})

app.listen(PORT, () => {
    console.log(`listening in on ${PORT}`);
})

