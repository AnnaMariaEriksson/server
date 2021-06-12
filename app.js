const express = require('express');
const path = require('path');
const app = express()
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000

dotenv.config();
bodyParser.json();

const mysql = require("mysql");

let pool = mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: '/run/mysqld/mysqld.sock',
    host: '75.119.149.113'
});

app.get('/', (req, res) => res.send('Hello World!'))

app.get("/api/gdm/dogs", async (req, res) => {
    let data = await pool.query("SELECT * FROM grea_db.dogs");
    res.json(data);
});

app.listen( async () => {
    try {
        exports.getConnection = function(callback) {
            pool.getConnection(function(err, conn) {
                if(err) {
                    return callback(err);
                }
                callback(err, conn);
            });
        };
        console.log("server running on port " + port);
    } catch (e) {
        console.log(e);
    }
});
