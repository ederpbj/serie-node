const fs = require('fs')
const path = require('path')

module.exports = app => {
    fs
    //Lê diretório que esta operando no syncjs
        .readdirSync(__dirname)
        //Filtra por todos que não sejam index e começem com 0
        .filter(file => ((file.indexOf('.')) !==0 && (file != "index.js")))
        //Faz uma busca e passa o app para cada um deles
        .forEach(file => require(path.resolve(__dirname, file))(app));
}