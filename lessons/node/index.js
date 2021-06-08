const express = require('express');
const config = {
    host : 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};


const mysql = require('mysql');

const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) VALUES ('Alisson');`
connection.query(sql);
connection.end()
const app = express()

app.get('/', (req, res) => {
    res.send("<h1>Alisson Allebrandt</h1>")
})

app.listen(3001, () => {
    console.log('Listen on port 3000')
})