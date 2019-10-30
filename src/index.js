const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));


//Repassando o (app)
require('./controllers/index')(app);

app.listen(27017)