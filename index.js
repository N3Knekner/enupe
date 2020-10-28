const System = require("./class/System.class.js");
const express = require("express");
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');

const LogoffAutoTest = require("./class/testLogoff.class.js");


const app = express();

app.use(cors());


app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(bodyParser.json());

//app.listen(8080, "200.135.58.18");
app.listen(3333, "localhost");
//System.begin(app, "200.135.58.18", "equipe4", "Equipe04.", "equipe4");
//System.begin(app, "localhost", "root", "", "ENUPE_BD");

LogoffAutoTest.begin(app);




/*const YOUClassTest = require("./class/NOME DO ARQUIVO.class.js");

YOUClassTest.begin(app);*/



