const System = require("./class/System.class.js");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.static('public'));

app.listen(8080);


System.sqlBegin("localhost","root","","ENUPE_BD");

System.verifyUser("claiton","c@gmail.com");

let x =System.newUser("claiton","123","c@gmail.com","00000",false);
System.sqlInsertion(x);


//MySQL.newOccurrence("TESTE ASSUNTO","2020-09-30","Blablabla blabla <- this is a txt",1,2,3);

