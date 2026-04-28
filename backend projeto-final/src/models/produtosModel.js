// Importar o pool de conexões do PostgreSQL
const pool = require('../config/database');

// ============================================================
// FUNÇÃO: listarTodos
// ============================================================
async function listarTodos() {
  // Ajustado para 'idp' e ordenação correta
  const result = await pool.query(
    'SELECT * FROM produtos ORDER BY idp'
  );
  return result.rows;
}

// ============================================================
// FUNÇÃO: buscarPorId
// ============================================================
async function buscarPorId(idp) {
  // Ajustado para 'idp'
  const result = await pool.query(
    'SELECT * FROM produtos WHERE idp = $1',
    [idp]
  );
  return result.rows[0];
}

// ============================================================
// FUNÇÃO: criar
// ============================================================
async function criar(dados) {
  // Desestruturação usando os novos nomes: nomep
  const { nomep, preco, estoque, categoria } = dados;
  
  const sql = `
    INSERT INTO produtos (nomep, preco, estoque, categoria)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nomep, preco, estoque, categoria]
  );
  
  return result.rows[0];
}

// ============================================================
// FUNÇÃO: atualizar
// ============================================================
async function atualizar(idp, dados) {
  const { nomep, preco, estoque, categoria } = dados;
  
  // Ajustado SET para 'nomep' e WHERE para 'idp'
  const sql = `
    UPDATE produtos
    SET nomep = $1, preco = $2, estoque = $3, categoria = $4
    WHERE idp = $5
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nomep, preco, estoque, categoria, idp]
  );
  
  return result.rows[0] || null;
}

// ============================================================
// FUNÇÃO: deletar
// ============================================================
async function deletar(idp) {
  // Ajustado para 'idp'
  const result = await pool.query(
    'DELETE FROM produtos WHERE idp = $1',
    [idp]
  );
  
  return result.rowCount > 0;
}

// ============================================================
// FUNÇÃO: buscarPorCategoria
// ============================================================
async function buscarPorCategoria(categoria) {
  const sql = 'SELECT * FROM produtos WHERE categoria ILIKE $1';
  const result = await pool.query(sql, [`%${categoria}%`]);
  return result.rows;
}

// ============================================================
// FUNÇÃO: buscarPorNome (Bônus para bater com o nomep)
// ============================================================
async function buscarPorNome(nomep) {
  const sql = 'SELECT * FROM produtos WHERE nomep ILIKE $1';
  const result = await pool.query(sql, [`%${nomep}%`]);
  return result.rows;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorCategoria,
  buscarPorNome
};