const express = require('express');
const mysql = require('mysql');

const config = {
    host : 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const app = express()

app.get('/', (req, res) => {

    const connection = mysql.createConnection(config);

    let strHmtl = `<h1>Full Cycle Rocks!</h1>`

    connection.query("SELECT Name FROM people", function (err, result, fields) {
        if (err) throw err;
        
        console.log(result)

        for(let i = 0; i < result.length; i++){
            strHmtl += `<br> <span>${result[i].Name}</span>`
        }

        connection.end()

        res.send(strHmtl)

    });

    
})

app.listen(3000, () => {
    console.log('Listen on port 3000')
})