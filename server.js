onst express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('<h1>BOT ATIVO 24/7</h1>'));

app.listen(PORT, () => {
    console.log(`[HTTP] Servidor de monitoramento ativo na porta ${PORT}`);
    
    function rodarBot() {
        console.log('[SISTEMA] Iniciando o bot principal em modo isolado...');
        
        // Inicia o bot passando parâmetros diretos para burlar o Hot Reload
        const bot = spawn('node', ['temux.js', '--no-watch'], { 
            stdio: 'inherit',
            env: { ...process.env, NODE_ENV: 'production' }
        });
        
        bot.on('close', (code) => {
            // Se o bot tentar fechar sozinho por causa do Hot Reload (geralmente código 0 ou 1),
            // o server.js não deixa a Render cair e liga o bot de volta no mesmo milissegundo!
            console.log(`[AVISO] O Hot Reload tentou derrubar o bot (Código ${code}). Reiniciando o processo interno imediatamente...`);
            rodarBot();
        });
    }

    rodarBot();
});

