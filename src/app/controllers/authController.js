const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../../models/User');
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


//Definindo uma rota /auth/register
module.exports = app => app.use('/auth', router);