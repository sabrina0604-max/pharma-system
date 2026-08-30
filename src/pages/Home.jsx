import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../componentes/Navbar'
import CardResumo from '../componentes/CardResumo'

function Home(){

  const [produtos, setProdutos] = useState([])

  useEffect(() =>{
    const produtosSalvos = localStorage.getItem("produtos");

    if (produtosSalvos){
      const listaProdutos = JSON.parse(produtosSalvos);
      setProdutos(listaProdutos)
    }
  }, []);


  const totalProdutos = produtos.length;

  const totalEstoqueBaixo = produtos.filter(item => item.estoque < 5).length

  const categorias = produtos.map(item => item.categoria)
  const categoriasUnicas = [...new Set(categorias)];
  const totalCategorias = categoriasUnicas.length
  


  return (
    <div className='home'>
      <h1>Dashboard</h1>
      <div className='cards'>
        <CardResumo icone="📦" titulo="Produtos" valor={totalProdutos} caminho="/produtos"/>
        <CardResumo icone="📂" titulo="Categorias" valor={totalCategorias} caminho="/produtos"/>
        <CardResumo icone="⚠️" titulo="Estoque Baixo" valor={totalEstoqueBaixo} caminho="/produtos?estoqueBaixo=true"/>
      </div>
    </div>
  )
}

export default Home