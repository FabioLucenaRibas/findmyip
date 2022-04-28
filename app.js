const express = require('express');
var cors = require('cors')
const app = express();

var expressPublicIp = require('express-public-ip');
const findmyipRoute = require('./routes/findmyip-route');

app.enable('trust proxy');

app.use(cors())
app.use(expressPublicIp());
app.use('/', findmyipRoute);

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