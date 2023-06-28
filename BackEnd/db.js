// Configuração do banco de dados
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cadastro",
});

module.exports = db;


// query do banco de dados 
//
//
//
//
//
//
//
//
