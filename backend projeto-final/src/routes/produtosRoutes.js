const express = require('express');
const router = express.Router();
// Importando o controller de produtos (ajuste o nome se necessário)
const produtosController = require('../controllers/produtosController');

// ==========================================
// ROTAS DE CONSULTA (GET)
// ==========================================

// Lista todos os produtos
router.get('/', produtosController.listarTodos);

router.get('/nomep/:nomep', produtosController.buscarPorNome);

// Busca por categoria
router.get('/categoria/:categoria', produtosController.buscarPorCategoria);

// Busca por ID (idp)
router.get('/:id', produtosController.buscarPorId);

// ==========================================
// ROTAS DE MANIPULAÇÃO (POST, PUT, DELETE)
// ==========================================

// Cria um novo produto
router.post('/', produtosController.criar);

// Atualiza um produto pelo ID
router.put('/:id', produtosController.atualizar);

// Remove um produto pelo ID
router.delete('/:id', produtosController.deletar);

module.exports = router;