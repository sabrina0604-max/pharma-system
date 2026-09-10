import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../componentes/Navbar'
import CardResumo from '../componentes/CardResumo'

function Home(){

  const [produtos, setProdutos] = useState([])
  const [vendas, setVendas] = useState([])

  useEffect(() =>{
    const produtosSalvos = localStorage.getItem("produtos");

    if (produtosSalvos){
      const listaProdutos = JSON.parse(produtosSalvos);
      setProdutos(listaProdutos)
    }
  }, []);

  useEffect(() =>{
    const vendasSalvas = localStorage.getItem("vendas");

    if(vendasSalvas){
      const listaVendas = JSON.parse(vendasSalvas);
      setVendas(listaVendas)
    }
  }, [])


  const totalProdutos = produtos.length;
  const totalVendas = vendas.length;

  const valorEstoque = produtos.reduce((total, produto) =>{
    return total + (Number(produto.preco)*(produto.estoque))
  }, 0)

  const totalVendido = vendas.reduce((total, venda) =>{
    return total + venda.precoTotal
  }, 0)

  const totalEstoqueBaixo = produtos.filter(item => item.estoque < 5).length

  const categorias = produtos.map(item => item.categoria)
  const categoriasUnicas = [...new Set(categorias)];
  const totalCategorias = categoriasUnicas.length
  
  function formatarMoeda(valor){
    return valor.toLocaleString("pt-BR",{
      style: "currency",
      currency: "BRL"
    })
  }

  const ultimasVendas = [...vendas].sort((a,b) =>{
    return new Date(b.data) - new Date(a.data)
  })

  return (
    <div className='home'>
      <h1>Dashboard</h1>
      <div className='cards'>
        <CardResumo icone="📦" titulo="Produtos" valor={totalProdutos} caminho="/produtos"/>
        <CardResumo icone="📂" titulo="Categorias" valor={totalCategorias} caminho="/produtos"/>
        <CardResumo icone="⚠️" titulo="Estoque Baixo" valor={totalEstoqueBaixo === 0 ? "Nenhum": totalEstoqueBaixo} caminho="/produtos?estoqueBaixo=true"/>
        <CardResumo icone="🛒" titulo="Vendas" valor={totalVendas} caminho="/venda"/>
        <CardResumo icone="💰" titulo="Total vendido" valor={formatarMoeda(totalVendido)} caminho="/venda"/>
        <CardResumo icone="💵" titulo="Valor em estoque" valor={formatarMoeda(valorEstoque)} caminho="/produtos"/>
      </div>
      <div className='ultimas-vendas'>
        <h2>Últimas Vendas</h2>
        <div className='cabecalho-ultima-venda'>
          <span>Produto</span>
          <span>Quantidade</span>
          <span>Total</span>
          <span>Data</span>
        </div>
        {ultimasVendas.slice(0, 5).map((venda) =>(
          <div className="linha-ultima-venda" key={venda.id}>
            <span>{venda.produto}</span>
            <span>{venda.quantidade} un.</span>
            <span>{formatarMoeda(venda.precoTotal)}</span>
            <span>{new Date(venda.data).toLocaleString("pt-BR")}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home