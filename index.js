const MySQL = require("./MySQLController");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.static('public'));

app.listen(8080);


MySQL.begin("localhost","root","","ENUPE_BD"); //host,user,password,database_name
MySQL.newUser("jubisclaiton","j@gmail.com"); //aki serao enviados todos os dados de cadastro

MySQL.end();
