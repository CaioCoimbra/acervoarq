import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
    console.log('1. Gerando build estático do Next.js...');
    execSync('npx next build', { stdio: 'inherit' });

    console.log('2. Copiando a pasta "api" para dentro de "out"...');

    const origemApi = path.join('src', 'pages', 'api');
    const destinoApi = path.join('out', 'api');

    if (fs.existsSync(origemApi)) {
        fs.cpSync(origemApi, destinoApi, { recursive: true });
        console.log('-> Pasta "api" copiada com sucesso!');
    } else {
        console.log('-> Aviso: Pasta "api" não foi encontrada em src/pages.');
    }

    console.log('3. Copiando o arquivo ".htaccess" para dentro de "out"...');
    if (fs.existsSync('.htaccess')) {
        fs.copyFileSync('.htaccess', path.join('out', '.htaccess'));
        console.log('-> Arquivo ".htaccess" copiado com sucesso!');
    } else {
        console.log('-> Aviso: Arquivo ".htaccess" não foi encontrado na raiz.');
    }

} catch (error) {
    console.error('Erro durante o processo de build:', error);
    process.exit(1);
}