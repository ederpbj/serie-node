const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true });
//mongoose.connect('mongodb://localhost/noderest', { useNewUrlParser: true, useUnifiedTopology: true });

//mongoose.connect('mongodb://localhost/noderest', options);

mongoose.connect('mongodb://localhost:27017/noderest', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

//Classe de promisse que o mongoose vai utilizar
mongoose.Promise = global.Promise;


module.exports = mongoose;
