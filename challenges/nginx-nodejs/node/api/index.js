const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const config = {
    host : 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {

    const connection = mysql.createConnection(config);

    let strHmtl = `<h1>Full Cycle Rocks!</h1>`

    connection.query("SELECT Name FROM people", function (err, result, fields) {
        
        connection.end()
        
        if (err) throw err;
        
        console.log(result)

        strHmtl += '<form action="http://localhost:8080/" method="post">'
        strHmtl += '<input type="text" name="people" placeholder="Nome da pessoa"></input>'
        strHmtl += '<button type="submit">Gravar</button>'

        strHmtl += '</form>'

        strHmtl += '<h4>Pessoas cadastradas</h4>'

        strHmtl += '<ul>'

        for(let i = 0; i < result.length; i++){
            strHmtl += `<li style='text-transform: capitalize;'>${result[i].Name}</li>`
        }

        strHmtl += '</ul>'

        res.send(strHmtl)

    });
})

app.post('/', (req, res) => {

    if(req.body.people){

        const connection = mysql.createConnection(config);

        connection.query(`INSERT INTO people VALUES('${req.body.people}')`, function (err, result, fields) {
            
            connection.end()
    
            if (err) throw err;
    
            res.redirect('/')
    
        });

    }else{
        res.redirect('/')
    }

})



app.listen(3000, () => {
    console.log('Listen on port 3000')
})