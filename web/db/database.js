require('dotenv').config();

const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'goce',
    password : 'GOCEgoce90',
    database : 'code_academy_a2'
    // host: process.env.HOST,
    // user: process.env.USER,
    // password: process.env.PASSWORD,
    // database: process.env.DATABASE
  });

  connection.connect(error=> {
    if (error) {
      console.log('error connecting: ' + error.message);
      return;
    }
   
    console.log('DB is connected !!! ' + connection.threadId);
  });

  module.exports =connection;