function createNew(age, kind, name){
    age = Number(age)
    // console.log(age)
    //read json file
    var data = fs.readFileSync('pets.json')
    //parse new object as json data
    var myObject= JSON.parse(data)
    //create new animal object
    var newAnimal = { "age": age, "kind": kind, "name": name}
    //push newAnimal to pets.json
    myObject.push(newAnimal)
    //turn myObject into Json stringify
    var newAnimal = JSON.stringify(myObject);
    //write file to pets.json
    fs.writeFile('pets.json',newAnimal, err => {
        if(err) throw err;
        // JSON.parse(newAnimal)
        newAnimal = JSON.parse(newAnimal)
        newAnimal = newAnimal[newAnimal.length-1]
        console.log(newAnimal)
    });
}
const fs = require('fs');
let command = process.argv[2];


if (process.argv.length < 3) {
    console.error('Usage: node pets.js [read | create | update | destroy]')
    process.exit(1)
}


if(command == 'read'){
    // do some read work
    fs.readFile('./pets.json', 'utf-8', function(error, data){
        if(error){
            console.error(error);
        }

        else {
            
            let parsedData = JSON.parse(data)
            console.log(parsedData);
        }
    })
}
if(command == 'create'){
    createNew(process.argv[3], process.argv[4], process.argv[5])
}




















