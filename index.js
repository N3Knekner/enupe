const System = require("./class/System.class.js");
const express = require("express");
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');

console.clear();

const app = express();

app.use(cors());

/* app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); */

app.use(bodyParser.json());

app.listen(3333, "localhost");
//app.listen(8080, "200.135.58.18");

//System.begin(app, "200.135.58.18", "equipe4", "Equipe04.", "equipe4","smtp.gmail.com",587,"tijolao.pc@gmail.com","socrepa.");
System.begin(app, "localhost", "root", "", "ENUPE_BD","smtp.gmail.com",587,"tijolao.pc@gmail.com","socrepa.");





