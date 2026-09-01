const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot Online e Conectado 24h via Render!');
});

app.listen(process.env.PORT || 8080, () => console.log('Porta 8080 ativa!'));

// Executa o bot de forma limpa pelo arquivo correto
require('./connect.js');
