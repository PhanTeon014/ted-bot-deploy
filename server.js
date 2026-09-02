const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('<h1>BOT ATIVO 24/7</h1>'));

app.listen(PORT, () => {
    console.log(`[HTTP] Servidor de monitoramento ativo na porta ${PORT}`);
    
    const bot = spawn('node', ['temux.js'], { stdio: 'inherit' });
    
    setTimeout(() => {
        const qrDir = path.join(__dirname, 'database', 'qr');
        if (fs.existsSync(qrDir)) {
            console.log('[SISTEMA] Protegendo pasta de sessoes contra loops...');
            try { fs.chmodSync(qrDir, 0o555); } catch(e) {}
        }
    }, 15000);

    bot.on('close', (code) => {
        console.log(`Bot finalizado com código ${code}`);
    });
});
