// Importar as funções do Model
// Verifique se o nome do arquivo no require está correto (com ou sem 's')
const ProdutoModel = require('../models/produtosModel');

// ============================================================
// FUNÇÃO: listarTodos (ASSÍNCRONA)
// ROTA: GET /produtos
// ============================================================
async function listarTodos(req, res) {
  try {
    const produtos = await ProdutoModel.listarTodos();
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar produtos', 
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorId (ASSÍNCRONA)
// ROTA: GET /produtos/:id
// ============================================================
async function buscarPorId(req, res) {
  try {
    const idp = parseInt(req.params.id); // Captura o ID da URL
    
    if (isNaN(idp)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }
    
    const produto = await ProdutoModel.buscarPorId(idp);
    
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ mensagem: `Produto #${idp} não encontrado` });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar produto',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: criar (ASSÍNCRONA)
// ROTA: POST /produtos
// ============================================================
async function criar(req, res) {
  try {
    // Note o uso de 'nomep' vindo do corpo da requisição (body)
    const { nomep, preco, estoque, categoria } = req.body;
    
    // Validações
    if (!nomep || preco === undefined || estoque === undefined || !categoria) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    
    if (parseFloat(preco) <= 0) {
      return res.status(400).json({ mensagem: 'O preço deve ser maior que zero' });
    }
    
    const novoProduto = await ProdutoModel.criar({ 
      nomep, 
      preco, 
      estoque, 
      categoria 
    });
    
    res.status(201).json(novoProduto);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar produto',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: atualizar (ASSÍNCRONA)
// ROTA: PUT /produtos/:id
// ============================================================
async function atualizar(req, res) {
  try {
    const idp = parseInt(req.params.id);
    const { nomep, preco, estoque, categoria } = req.body;
    
    if (isNaN(idp)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }
    
    if (!nomep || preco === undefined || estoque === undefined || !categoria) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    
    const produtoAtualizado = await ProdutoModel.atualizar(idp, { 
      nomep, 
      preco, 
      estoque, 
      categoria 
    });
    
    if (produtoAtualizado) {
      res.status(200).json(produtoAtualizado);
    } else {
      res.status(404).json({ mensagem: `Produto #${idp} não encontrado` });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar produto',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: deletar (ASSÍNCRONA)
// ROTA: DELETE /produtos/:id
// ============================================================
async function deletar(req, res) {
  try {
    const idp = parseInt(req.params.id);
    
    if (isNaN(idp)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }
    
    const deletado = await ProdutoModel.deletar(idp);
    
    if (deletado) {
      res.status(200).json({ mensagem: `Produto #${idp} removido com sucesso` });
    } else {
      res.status(404).json({ mensagem: `Produto #${idp} não encontrado` });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar produto',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorCategoria (ASSÍNCRONA)
// ROTA: GET /produtos/categoria/:categoria
// ============================================================
async function buscarPorCategoria(req, res) {
  try {
    const { categoria } = req.params;
    const produtos = await ProdutoModel.buscarPorCategoria(categoria);
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar produtos por categoria',
      erro: erro.message 
    });
  }
}

async function buscarPorNome(req, res) {
  try {
    const { nomep } = req.params; // Captura o nome vindo da URL
    const produtos = await ProdutoModel.buscarPorNome(nomep);
    
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar produtos por nome',
      erro: erro.message 
    });
  }
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorCategoria,
  buscarPorNome
};