const System = require("./class/System.class.js");
const express = require("express");
const cors = require("cors");
const { main } = require("./class/System.class.js");

const app = express();

app.use(cors());

app.use(express.static('public'));

app.listen(8080);

System.begin(app,"localhost","root","","ENUPE_BD");



