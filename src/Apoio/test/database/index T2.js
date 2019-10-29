const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true });
//mongoose.connect('mongodb://localhost/noderest');


//Classe de promisse que o mongoose vai utilizar
mongoose.Promise = global.Promise;

//T2
const url = 'mongodb://localhost/fullstack'
console.log('Connection url = ', url, 'connecting')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
console.log('Connected.')
//mongoose.connection.close()
    

module.exports = mongoose;

