const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true });
//mongoose.connect('mongodb://localhost/noderest');

//T1
mongoose.connect('mongodb://noderest', { useNewUrlParser: true, useUnifiedTopology: true });

/* new Promise((resolve, reject) => {
    setTimeout(() => reject('woops'), 500);
}); */
//<T1

//Classe de promisse que o mongoose vai utilizar
mongoose.Promise = global.Promise;


module.exports = mongoose;