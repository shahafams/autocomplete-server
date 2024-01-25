const fs = require('fs');
const readline = require('readline');
const mysql = require('mysql');

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

const rl = readline.createInterface({
    input: fs.createReadStream('./world-cities.txt'),
    crlfDelay: Infinity,
});

rl.on('line', (line) => {
    const sqlInsert = 'INSERT INTO cities (name) VALUES ?';
    const values = [[line.trim()]];

    connection.query(sqlInsert, [values], (insertErr, results) => {
        if (insertErr) {
            console.error('Error inserting data into MySQL:', insertErr.message);
        }
    });
});

rl.on('close', () => {
    connection.end();
});