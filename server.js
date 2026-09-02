
const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('<h1>BOT ATIVO 24/7</h1>'));

app.listen(PORT, () => {
    console.log(`[HTTP] Servidor de monitoramento ativo na porta ${PORT}`);
    
    // Forçamos o Node a rodar sem os argumentos de monitoramento (watch/dev)
    // E limpamos os argumentos extras que o package.json tenta passar
    const bot = spawn('node', ['--no-deprecation', 'temux.js'], { 
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production', CHOKIDAR_USEPOLLING: 'false' }
    });
    
    bot.on('close', (code) => {
        console.log(`Bot finalizado com código ${code}`);
    });
});

