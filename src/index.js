const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));


//Repassando o (app)
require('./app/controllers/index')(app);

//app.listen(27017)

app.listen(27017, () => {
    console.log('Run Auth API Server')
  })