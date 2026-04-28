import { useState, useEffect } from "react";
import API_URL from "../../services/api"; 
import "./Cadastro.css";

export default function Cadastro() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [idEditando, setIdEditando] = useState(null);
  const [form, setForm] = useState({ nomep: "", preco: "", estoque: "", categoria: "" });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setCarregando(true);
        const res = await fetch(API_URL);
        const dados = await res.json();
        setProdutos(dados);
      } catch (error) {
        console.error("Erro ao buscar:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const metodo = idEditando ? "PUT" : "POST";
    const url = idEditando ? `${API_URL}/${idEditando}` : API_URL;

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert(idEditando ? "Atualizado!" : "Cadastrado!");
        setForm({ nomep: "", preco: "", estoque: "", categoria: "" });
        setIdEditando(null);
        
        const atualizar = await fetch(API_URL);
        const novosDados = await atualizar.json();
        setProdutos(novosDados);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar.");
    }
  };

  
  const excluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        const atualizar = await fetch(API_URL);
        const novosDados = await atualizar.json();
        setProdutos(novosDados);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container-projeto">
      <h1>Gestão de Produtos</h1>

     
      <form onSubmit={handleSubmit} className="cadastro-form">
        <input 
          placeholder="Nome" 
          value={form.nomep} 
          onChange={e => setForm({...form, nomep: e.target.value})} 
        />
        <input 
          type="number" 
          placeholder="Preço" 
          value={form.preco} 
          onChange={e => setForm({...form, preco: e.target.value})} 
        />
        <input 
          type="number" 
          placeholder="Estoque" 
          value={form.estoque} 
          onChange={e => setForm({...form, estoque: e.target.value})} 
        />
        <input 
          placeholder="Categoria" 
          value={form.categoria} 
          onChange={e => setForm({...form, categoria: e.target.value})} 
        />
        <button type="submit" className="btn-save">
          {idEditando ? "Salvar" : "Cadastrar"}
        </button>
      </form>

      <div className="lista-section">
        {carregando ? <p>Buscando produtos...</p> : (
          <table className="tabela-estilo">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(p => (
                <tr key={p.idp}>
                  <td>{p.nomep}</td>
                  <td>R$ {p.preco}</td>
                  <td>
                    <button onClick={() => {setForm(p); setIdEditando(p.idp)}}>✏️</button>
                    <button onClick={() => excluir(p.idp)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}