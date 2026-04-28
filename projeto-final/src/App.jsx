import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cadastro from "./pages/Cadastro/Cadastro";
import Sobre from "./pages/Sobre/Sobre";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
  
        <header className="main-header">
          <div className="header-content">
            <div className="logo">📦 Estoque<azul>Master</azul></div>
            <nav className="nav-menu">
              <Link to="/">Início</Link>
              <Link to="/cadastro">Produtos</Link>
              <Link to="/sobre">Sobre</Link>
            </nav>
          </div>
        </header>

       
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </main>

  
        <footer className="main-footer">
          <div className="footer-content">
            <p>&copy; 2026 Gustavo Bonetto. Todos os direitos reservados.</p>
            <p>Projeto Final</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;