const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shahaf343536',
    database: 'city_database',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

app.post('/autocomplete', (req, res) => {
    const value = req.body.value;
    const sqlQuery = `SELECT name FROM cities WHERE name LIKE ?`;

    connection.query(sqlQuery, [`${value}%`], (error, results) => {
        if (error) {
            console.error('Error message:', error.message);
            return res.status(500).json([]);
        } else {
            const options = results.map((row) => row.name);
            return res.json(options);
        }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});