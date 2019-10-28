const express = require('express');

const User = require('../models/use');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        //await (espera terminar para executar)
        const user = await User.create(req.body);

        return res.send({user})
    } catch (error) {
        return res.status(400).send({ error: 'Registration failed' });
    }
})

//Repassando o (app)
require('./controllers/authController')(app);

//Definindo uma rota /auth/register
module.exports = app => app.use('auth', router);