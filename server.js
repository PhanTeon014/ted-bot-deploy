const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('<h1>BOT ATIVO 24/7</h1>'));

app.listen(PORT, () => {
    console.log(`[HTTP] Servidor de monitoramento ativo na porta ${PORT}`);
    
    // Injeta variáveis de ambiente que desativam o nodemon / chokidar / pm2 internamente
    const bot = spawn('node', ['temux.js'], { 
        stdio: 'inherit',
        env: { 
            ...process.env, 
            NODE_ENV: 'production',
            NODEMON_OPTION: 'none',
            CHOKIDAR_USEPOLLING: 'false',
            WATCH: 'false'
        }
    });
    
    bot.on('close', (code) => {
        console.log(`Bot finalizado com código ${code}`);
    });
});

