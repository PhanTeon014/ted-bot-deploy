const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

// Responde à Render imediatamente para o deploy ficar VERDE (Live)
app.get('/', (req, res) => res.send('<h1>BOT ATIVO 24/7</h1>'));

app.listen(PORT, () => {
    console.log(`[HTTP] Servidor de monitoramento ativo na porta ${PORT}`);
    
    // Inicia o seu bot principal em segundo plano com segurança
    const bot = spawn('node', ['temux.js'], { stdio: 'inherit' });
    
    bot.on('close', (code) => {
        console.log(`Bot finalizado com código ${code}`);
    });
});

