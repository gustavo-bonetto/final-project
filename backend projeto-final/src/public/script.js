// ========================================
// VARIÁVEIS GLOBAIS
// ========================================

let produtoEmEdicao = null;

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

function mostrarMensagem(mensagem, tipo = 'info') {
    const modal = document.getElementById('modalMessage');
    const modalText = document.getElementById('modalText');
    
    modalText.textContent = mensagem;
    modal.style.display = 'flex';
    
    // Estilização simples baseada no tipo
    modal.style.backgroundColor = tipo === 'erro' ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.7)';
}

function fecharModal() {
    document.getElementById('modalMessage').style.display = 'none';
}

function limparFormulario() {
    document.getElementById('productForm').reset();
    produtoEmEdicao = null;
    document.querySelector('.form-section h2').textContent = 'Adicionar ou Editar Produto';
}

// Formata Preço para Moeda Brasileira
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

// ========================================
// OPERAÇÕES COM A API
// ========================================

async function carregarProdutos() {
    const loadingMessage = document.getElementById('loadingMessage');
    const emptyMessage = document.getElementById('emptyMessage');
    const productsList = document.getElementById('productsList');
    
    loadingMessage.style.display = 'block';
    productsList.innerHTML = '';
    
    try {
        const resposta = await fetch('/produtos');
        if (!resposta.ok) throw new Error('Erro ao buscar produtos');
        
        const produtos = await resposta.json();
        loadingMessage.style.display = 'none';
        
        if (produtos.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
            exibirTabela(produtos);
        }
    } catch (erro) {
        loadingMessage.style.display = 'none';
        console.error('Erro:', erro);
        mostrarMensagem('Erro ao carregar os produtos.', 'erro');
    }
}

async function criarProduto(dados) {
    try {
        const resposta = await fetch('/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.error || 'Erro ao criar produto');
        }
        
        mostrarMensagem('Produto cadastrado com sucesso!', 'sucesso');
        limparFormulario();
        carregarProdutos();
    } catch (erro) {
        mostrarMensagem('Erro: ' + erro.message, 'erro');
    }
}

async function atualizarProduto(idp, dados) {
    try {
        const resposta = await fetch(`/produtos/${idp}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.error || 'Erro ao atualizar produto');
        }
        
        mostrarMensagem('Produto atualizado com sucesso!', 'sucesso');
        limparFormulario();
        carregarProdutos();
    } catch (erro) {
        mostrarMensagem('Erro: ' + erro.message, 'erro');
    }
}

async function deletarProduto(idp) {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    
    try {
        const resposta = await fetch(`/produtos/${idp}`, { method: 'DELETE' });
        if (!resposta.ok) throw new Error('Erro ao deletar produto');
        
        mostrarMensagem('Produto removido com sucesso!', 'sucesso');
        carregarProdutos();
    } catch (erro) {
        mostrarMensagem('Erro: ' + erro.message, 'erro');
    }
}

// ========================================
// EXIBIÇÃO DE DADOS
// ========================================

function exibirTabela(produtos) {
    const productsList = document.getElementById('productsList');
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    produtos.forEach(prod => {
        html += `
            <tr>
                <td>#${prod.idp}</td>
                <td>${prod.nomep}</td>
                <td>${formatarMoeda(prod.preco)}</td>
                <td>${prod.estoque} un</td>
                <td>${prod.categoria}</td>
                <td class="acoes">
                    <button class="btn btn-edit" onclick="editarProduto(${prod.idp}, '${prod.nomep}', ${prod.preco}, ${prod.estoque}, '${prod.categoria}')">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="deletarProduto(${prod.idp})">🗑️ Deletar</button>
                </td>
            </tr>
        `;
    });
    
    html += `</tbody></table>`;
    productsList.innerHTML = html;
}

function editarProduto(id, nome, preco, estoque, categoria) {
    produtoEmEdicao = id;
    
    document.getElementById('nomep').value = nome;
    document.getElementById('preco').value = preco;
    document.getElementById('estoque').value = estoque;
    document.getElementById('categoria').value = categoria;
    
    document.querySelector('.form-section h2').textContent = `Editando Produto #${id}`;
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// BUSCA E FILTRO
// ========================================

async function buscarProdutos(tipo, valor) {
    const productsList = document.getElementById('productsList');
    try {
        const rota = tipo === 'id' ? `/produtos/${valor}` : `/produtos/${tipo}/${valor}`;
        const resposta = await fetch(rota);
        if (!resposta.ok) throw new Error('Erro na busca');
        
        const resultado = await resposta.json();
        const produtos = Array.isArray(resultado) ? resultado : [resultado];
        
        exibirTabela(produtos);
    } catch (erro) {
        mostrarMensagem('Erro ao buscar os produtos.', 'erro');
    }
}

function filtrarProdutos() {
    const searchInput = document.getElementById('searchInput');
    const searchType = document.getElementById('searchType');
    const valor = searchInput.value.trim();
    
    if (valor === '') {
        carregarProdutos();
    } else {
        buscarProdutos(searchType.value, valor);
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
    
    document.getElementById('productForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nomep = document.getElementById('nomep').value.trim();
        const preco = parseFloat(document.getElementById('preco').value);
        const estoque = parseInt(document.getElementById('estoque').value);
        const categoria = document.getElementById('categoria').value.trim();
        
        if (!nomep || isNaN(preco) || isNaN(estoque) || !categoria) {
            mostrarMensagem('Por favor, preencha todos os campos corretamente!', 'erro');
            return;
        }
        
        const dados = { nomep, preco, estoque, categoria };
        
        if (produtoEmEdicao) {
            atualizarProduto(produtoEmEdicao, dados);
        } else {
            criarProduto(dados);
        }
    });
    
    document.getElementById('btnLimpar').addEventListener('click', limparFormulario);
    document.getElementById('btnRecarregar').addEventListener('click', carregarProdutos);
    document.getElementById('btnBuscar').addEventListener('click', filtrarProdutos);
    
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filtrarProdutos();
    });
});