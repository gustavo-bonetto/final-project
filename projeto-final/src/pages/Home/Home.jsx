import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bem-vindo ao Sistema de Gestão</h1>
      </header>
      
      <main className="home-content">
        <section className="welcome-section">
          <h2>Controle seu estoque de forma simples</h2>
          <p>Utilize o menu para navegar entre o cadastro de produtos e as informações do projeto.</p>
        </section>

        <div className="home-cards">
          <div className="card">
            <h3>Produtos</h3>
            <p>Gerencie, edite e exclua itens do seu banco de dados.</p>
            <Link to="/cadastro" className="btn-home">Ir para Cadastro</Link>
          </div>
          
          <div className="card">
            <h3>Sobre</h3>
            <p>Saiba mais sobre o desenvolvedor e o projeto.</p>
            <Link to="/sobre" className="btn-home">Ver Detalhes</Link>
          </div>
        </div>
      </main>
    </div>
  );
}