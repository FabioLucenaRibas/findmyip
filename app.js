const express = require('express');
const app = express();

var expressPublicIp = require('express-public-ip');
const findmyipRoute = require('./routes/findmyip-route');

app.enable('trust proxy');

app.use(expressPublicIp());
app.use('/', findmyipRoute);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', '*'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).send({});
    }
    next();
});


app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;