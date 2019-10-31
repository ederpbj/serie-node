const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
//Para verificação de token
const crypto = require('crypto')

const mailer = require('../../modules/mailer')
const User = require('../models/User');
const authConfig = require('../../config/auth');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign( params, authConfig.secret, {
        //Expira em um dia = 86400 seg
        expiresIn: 86400
    });
}

router.post('/register', async (req, res) => {
    const {email} = req.body;

    try {

        if(await User.findOne({email})){
            return res.status(400).send({error: 'User already exists'})
        }

        //await (espera terminar para executar)
        const user = await User.create(req.body);

        user.password = undefined;

        //console.log("Passou aqui xxxx")

        return res.send({
            user,
            token: generateToken({ id: user.id}),
        })

    } catch (error) {
        return res.status(400).send({ error: 'Registration failed' });
    }
})

router.post('/authenticate', async (res, req) => {
    const { email, password } = req.body;

    const user = await User.findOne({email}).select('+password');
    
    console.log(user)

    if(!user){
        return res.status(400).send({ error: 'User not found'});
    }
    
    if(! await bcrypt.compare(password, user.password)){
        return res.status(400).send({ error: 'Invalid password'});
    }

    user.password = undefined;
/* 
    const token = jwt.sign( {id: user.id }, authConfig.secret, {
        //Expira em um dia = 86400 seg
        expiresIn: 86400
    });
 */
    res.send({ 
        user, 
        token: generateToken({ id: user.id}), 
    });
})

router.post('/forgot_password', async (req, res) => {
    //Qual email quer recuperar senha
    const {email} = req.body;

    //Primeira coisa a fazer é um try catch
    try {
        //Verificar se o email esta cadastrado na base de dados
        const user = await User.findOne({email});

        if(!user)
            return res.status(400).send({ error: 'User not found'});
        
        //Gera token aleatório de 20 caracteres, hexadecimal
        const token = crypto.randomBytes(20).toString('hex');

        //Tempo de expiração, uma hora a mais
        const now = new Date();
        now.setHours(now.getHours +1);

        //Atualiza valores
        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        console.log(token, now);

        mailer.sendMail({
            
            //Email recebido no reset
            to: email,
            from: 'ederpbj@gmail.com',
            template: 'auth/forgot_password',
            context: {token},
        }, (err) => {
            if(err)
                return res.status(400).send({error: 'Canot send forgot password email'});
            
            //Se não der erro
            return res.send()
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({error: 'Erro on forgot password, try again'});
    }
})

//Definindo uma rota /auth/register
module.exports = app => app.use('/auth', router);