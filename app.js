// 1- we will use express library
const express = require('express');
// 2- create an instance from express
const app = express();
// 5- We will use filesystem
const fs = require('fs');

// 4- Route - Main Page
/*
* this route runs and prints "Route Works" on screen
*/
app.get('/', (req, res) => {
    res.send('Route Works');
});

// 4- Routes For JSON CRUD Operations
// Create
app.get('/create', (req, res) => {
    // we create new member
    var newMember = {
        "name": "Eko",
        "surname": "ekoremdev@gmail.com",
        "instrument": "Keyboard"
    }
    // we call the json first
    fs.readFile('data.json', 'utf8', (error, data) => {
        data = JSON.parse(data);
        data["member6"] = newMember;
        fs.writeFile('data.json', JSON.stringify(data), (error) => {
            console.log('error occured : ' + error);
        });
    });
    res.send('new member created');
});

// Read
app.get('/read', (req, res) => {
    console.log('List From JSON');
    fs.readFile('data.json', 'utf8', (error, data) => {
        console.log('Listing...');
        res.send(data);
    });
});

// Update
app.get('/update', (req, res) => {
    // res.send('Update');
    fs.readFile('data.json', 'utf8', (error, data) => {
        data = JSON.parse(data);
        var memberID = "member6";

        var oldMember = data[memberID];
        var name = oldMember.name + " Updated ";
        var surname = oldMember.surname + " Updated ";
        var instrument = oldMember.instrument + " Updated ";

        var updatedMember = {
            "name": name,
            "surname": surname,
            "instrument": instrument
        };

        delete data[memberID];
        data["member6"] = updatedMember;

        fs.writeFile('data.json', JSON.stringify(data), (error) => {
            console.log('error occured : ' + error);
        });

        res.end(JSON.stringify(data[memberID]));
    });
});

// Delete
app.get('/delete', (req, res) => {
    fs.readFile('data.json','utf8',(error, data)=>{
        data = JSON.parse(data);
        var memberID = "member6";
        delete data[memberID];
        fs.writeFile('data.json',JSON.stringify(data),(error)=>{
            console.log('Error Occured ' + error);
        });
        res.end('Member is deleted');
    });
});

// notFound
app.get('*', (req, res) => {
    res.send('Whats Wrong With You');
});


// 3- Create server and Run
const server = app.listen(3000, () => {
    console.log('Server Up and Runs on Port 3000');
});