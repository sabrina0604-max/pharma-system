import React, { useEffect, useState } from 'react'
import Button from '../componentes/Button'
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

  const estoqueBaixo = produtos.filter(item => item.estoque < 5)
  const totalEstoqueBaixo = estoqueBaixo.length

  const categorias = produtos.map(item => item.categoria)
  const categoriasUnicas = [...new Set(categorias)];
  const totalCategorias = categoriasUnicas.length
  


  return (
    <>
    <h1>Farmácia</h1>
    <div className='cards'>
      <CardResumo icone="📦" titulo="Produtos" valor={totalProdutos} caminho="/produtos"/>
      <CardResumo icone="📂" titulo="Categorias" valor={totalCategorias}/>
      <CardResumo icone="⚠️" titulo="Estoque Baixo" valor={totalEstoqueBaixo} caminho="/produtos?estoqueBaixo=true"/>
    </div>
    <Button caminho="/cadastro" texto="Cadastro"></Button>
    <Button caminho="/produtos" texto="Produtos"></Button>
    </>
  )
}

export default Home