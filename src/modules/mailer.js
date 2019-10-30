//MODULOS: São arquivos que não estão relacionados diretamente com a aplicação
const nodemailer = require("nodemailer");

//Forma de preencher engines em arquivos html
const hbs = require('nodemailer-express-handlebars')

//Desestruturação para pegar só as variáveis
//const mailConfig = require('../config/mail.json')
const { host, port, user, pass } = require("../config/mail.json");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass}
});

module.exports = transport;
