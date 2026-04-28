import { Link } from "react-router-dom";
import "./Sobre.css";

export default function Sobre() {
  return (
    <div className="sobre-page">
      <main className="glass-card">
        <section className="sobre-content">
         
          <h2>Estoque Master</h2>
          
          <p className="description">
            O <strong>Estoque Master</strong> nasceu do grupo <strong>Men's Caves</strong>, 
            formado por alunos do SENAI focados em excelência no desenvolvimento. 
            Abaixo, você confere os cabeções responsáveis por este projeto.
          </p>

          <div className="photo-container">
            <img 
              src="https://chatgpt.com/backend-api/estuary/public_content/enc/eyJpZCI6Im1fNjllZjc4NTRiNDQ4ODE5MWE1M2NjMzkxYjk2NTU5ZGI6ZmlsZV8wMDAwMDAwMGViZmM3MjBlYTcyMWIxYTAxYTg3YTExMCIsInRzIjoiMjA1NzAiLCJwIjoicHlpIiwiY2lkIjoiMSIsInNpZyI6ImFlNWUwY2RkNDAxNjg4ZTRhZDM0YmFjNmE2ZDU4M2QyNDg2NWVkOGRlNmU3MWI5Y2UwMmZjMzQxOGQ5ZWVjOTEiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsLCJjcyI6bnVsbCwiY2RuIjpudWxsLCJjcCI6bnVsbCwibWEiOm51bGx9" 
              alt="Nossa Equipe - Men's Caves" 
              className="mission-photo" 
            />
          </div>

          <div className="footer-links">
            <Link to="/" className="btn-voltar">
              Voltar para o Início
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}