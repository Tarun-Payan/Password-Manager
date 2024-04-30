const express = require('express')
const dotenv = require('dotenv').config()
const { MongoClient } = require('mongodb');
const cors = require('cors')
const bodyparser = require('body-parser')

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working

// Database Name
const dbName = 'passop';

const app = express()
const port = 3000
app.use(cors())
app.use(bodyparser.json())

// Below request is for get all data from mongodb
app.get('/', async (req, res) => {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const passwords = db.collection('passwords');

    const findResult = await passwords.find({}).toArray();
    // console.log('Found documents =>', findResult);

    res.send(findResult)
})

// Below request is for add data into the mongodb
app.post('/', async (req, res) => {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const passwords = db.collection('passwords');

    await passwords.insertOne(req.body)
    
    res.send("Successfully saved")
})

// Below request is for update data into the database
app.patch('/', async (req, res) => {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const passwords = db.collection('passwords');

    await passwords.updateOne({id:req.body.form.id}, {$set:{site:req.body.form.site, name:req.body.form.name, password:req.body.form.password}})
    
    res.send("updated")
    console.log("Update successfully")
})

// Below request is for add data into the mongodb
app.delete('/', async (req, res) => {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const passwords = db.collection('passwords');

    await passwords.deleteOne({id:req.body.id})
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})