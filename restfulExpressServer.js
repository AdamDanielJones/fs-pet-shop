const PORT = 3000;
const express = require('express');
const app = express();
const {Client} = require('pg');
const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/pet_shop'

const client = new Client({
    connectionString: connectionString,
})

client.connect();

app.use(express.json());

app.get('/pets', (req, res)=> {
    client.query(`SELECT * FROM pets`)
    .then(result => {
        res.send(result.rows);
    })
})

app.get('/pets/:id', (req, res)=> {
    var input = req.params.id
    client.query(`SELECT * FROM pets WHERE pets_id=${input}`)
    .then(result => {
        res.send(result.rows);
    })
})

app.get('/pets/name/:name', (req, res)=> {
    var input = req.params.name
    client.query(`SELECT * FROM pets WHERE name='${input}'`)
    .then(result => {
        res.send(result.rows);
    })
})

app.get('/pets/age/:age', (req, res)=> {
    var input = req.params.age
    client.query(`SELECT * FROM pets WHERE age=${input}`)
    .then(result => {
        res.send(result.rows);
    })
})


app.post('/pets/create', (req, res) => {
    var nameInput = req.body.name;
    var ageInput = req.body.age;
    var kindInput = req.body.kind;
    client.query(`INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3)`, [nameInput, ageInput, kindInput])
    .then(result => {
        res.send(result);
    })
})

app.patch('/pets/update', (req, res) => {
    var petId = req.body.id;
    var nameInput = req.body.name;
    var ageInput = req.body.age;
    var kindInput = req.body.kind;
    if (nameInput) {
        client.query(`UPDATE pets SET name = '${nameInput}'  WHERE pets_id = ${petId}`)
        .then(result => {
            res.send('success')})
    }
    else if (ageInput) {
        client.query(`UPDATE pets SET age = ${ageInput}  WHERE pets_id = ${petId}`)
        .then(result => {
            res.send('success')})
    }
    else if (kindInput) {
        client.query(`UPDATE pets SET kind = '${kindInput}'  WHERE pets_id = ${petId}`)
        .then(result => {
            res.send('success')})
    }
    else {
        res.send('Incorrect format')
    }
})

app.delete('/pets/delete/:id', (req, res) => {
        var petId = req.body.id;
        client.query(`DELETE FROM pets WHERE pets_id = $1`, [petId])
        .then(result => {
            res.send('Deleted')})
})

app.listen(PORT, () => {
    console.log(`listening in on ${PORT}`);
})

