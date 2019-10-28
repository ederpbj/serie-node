const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true });
//Classe de promisse que o mongoose vai utilizar
mongoose.Promise = global;