console.clear();
console.log("\n\n------ Tests mode inicializated ------ \n\n");

const System = require("./class/System.class.js");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

//=======Tests=======//
const LogoffAutoTest = require("./class/testLogoff.class.js");
const testSQLinjection = require("./class/testSQLinjection.class");
const SUACLASSE = require("./class/NOME DO ARQUIVO.class")

/*const YOUClassTest = require("./class/NOME DO ARQUIVO.class.js");*/


//=====End Tests=====//

const app = express();

app.use(cors());

app.listen(3333, "localhost");

System.begin(app, "localhost", "root", "", "ENUPE_BD","smtp.gmail.com",587,"tijolao.pc@gmail.com","socrepa.");

//=======Tests=======//
new LogoffAutoTest(app);
new testSQLinjection(app);
new SUACLASSE(app);

/* YOUClassTest(app); */

//=====End Tests=====//




