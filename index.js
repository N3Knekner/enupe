const System = require("./class/System.class.js");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');


const app = express();

app.use(cors());

app.use(express.static('public'));
app.use(bodyParser.json());


app.listen(3333);

System.begin(app,"localhost","root","","ENUPE_BD");



