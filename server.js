const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('<h1>BOT ATIVO 24/7</h1>'));

app.listen(PORT, () => {
    console.log(`[HTTP] Servidor de monitoramento ativo na porta ${PORT}`);
    
    // TRUQUE DEFINITIVO: Criamos um atalho (Symlink) para desviar as gravações da sessão.
    // O bot vai achar que está salvando em database/qr/, mas os arquivos vão para o sistema isolado da Render,
    // deixando a pasta original estática e "cegando" o Hot Reload oculto!
    try {
        const localQrDir = path.join(__dirname, 'database', 'qr');
        const tempQrDir = '/tmp/qr_session';
        
        if (!fs.existsSync(tempQrDir)) {
            fs.mkdirSync(tempQrDir, { recursive: true });
        }
        
        // Se houver arquivos de sessão antigos enviados do git, copiamos para a pasta invisível
        if (fs.existsSync(localQrDir)) {
            const files = fs.readdirSync(localQrDir);
            files.forEach(file => {
                fs.copyFileSync(path.join(localQrDir, file), path.join(tempQrDir, file));
            });
            // Removemos a pasta antiga monitorada para criar o link falso
            fs.rmSync(localQrDir, { recursive: true, force: true });
        }
        
        // Criamos o atalho apontando o caminho monitorado para a pasta invisível
        fs.symlinkSync(tempQrDir, localQrDir, 'dir');
        console.log('[SISTEMA] Desvio de pastas ativado com sucesso. Loop quebrado!');
    } catch (e) {
        console.log('[AVISO] Erro ao criar desvio de pastas:', e.message);
    }

    // Inicia o bot principal
    const bot = spawn('node', ['temux.js'], { 
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' }
    });
    
    bot.on('close', (code) => {
        console.log(`Bot finalizado com código ${code}`);
    });
});

