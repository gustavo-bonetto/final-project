require('dotenv').config();
const express = require('express'); 
const path = require('path');
const cors = require('cors'); // IMPORTANTE: Adicionado para permitir conexão com o React
const app = express(); 

// Pela tua imagem anterior, o teu .env está a usar a porta 2000
const PORT = process.env.PORT || 2000; 

// CONFIGURAÇÕES OBRIGATÓRIAS
app.use(cors()); // IMPORTANTE: Liberta o acesso para o React (resolve erro de CORS)
app.use(express.json()); // Permite receber dados em formato JSON

// Serve os arquivos da pasta public (opcional se usares apenas React)
app.use(express.static(path.join(__dirname, 'src', 'public'))); 

// ROTAS DA API
const produtosRoutes = require('./src/routes/produtosRoutes'); 
app.use('/produtos', produtosRoutes); 

// ROTAS DE TESTE (HTML ANTIGO)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'home.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'cadastro.html'));
});

// INICIALIZAÇÃO DO SERVIDOR
app.listen(PORT, () => { 
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`📡 API disponível em: http://localhost:${PORT}/produtos`);
});