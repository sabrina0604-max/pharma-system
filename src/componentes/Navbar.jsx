import React from 'react'
import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='navbar'>
        <h2>Sistema de Farmácia</h2>

        <div className="links">
            <Link to="/">Home</Link>
            <Link to="/cadastro">Cadastro</Link>
            <Link to="/produtos">Produtos</Link>
            <Link to="/vendas">Vendas</Link>
        </div>
    </nav>
  );
}

export default Navbar
