const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth.json');

//Intercepta a requisição entre controller e a rota
module.exports = (req, res, next) => {
    //Busca dentro da requisição
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({error: 'No token provided'});

    //exemplo de token: Bearer ajslksajdlksadasdioaj

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({error: 'Token error'});

    const [ scheme, token ] = parts;

    //Rejex, verifica se começa com Bearer
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: 'Token malformatted'});
    
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: 'Token invalid'});

        //Vem do auth controller
        req.userId = decoded.id;

        //Termina o middlewares e passa para controller
        return next();
    });
};