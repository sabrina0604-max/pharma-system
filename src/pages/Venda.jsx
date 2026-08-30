import React, { useEffect, useState } from 'react'
import Button from '../componentes/Button'
import './Venda.css'

const Venda = () => {

  const [produto, setProduto] = useState("")
  const [produtos, setProdutos] = useState([])
  const [quantidade, setQuantidade] = useState("")
  const [vendas, setVendas] = useState([])

  useEffect(()=>{
    const produtosSalvos = localStorage.getItem("produtos")

    if(produtosSalvos){
      const listaProdutos = JSON.parse(produtosSalvos)
      setProdutos(listaProdutos)
    }
  }, [])

  useEffect(()=>{
    const vendasSalvas = localStorage.getItem("vendas")

    if(vendasSalvas){
      const listaVendas = JSON.parse(vendasSalvas)
      setVendas(listaVendas)
    }
  },[])
  
  function escolherProduto(evento){
    setProduto(Number(evento.target.value))
  }

  function atualizarQuantidade(evento){
    const valor = evento.target.value

    if(valor === ""){
      setQuantidade("")
    }else{
      setQuantidade(Number(evento.target.value))
    }
  }

  const produtoSelecionado = produtos.find((item) =>
    item.id === produto
  )

  let precoTotal = ""

  if(produtoSelecionado){
    if(quantidade <= produtoSelecionado.estoque){
      precoTotal = Number(produtoSelecionado.preco) * quantidade
    }
  }

  function validações(){
    if(produto === ""){
      alert("Selecione um produto")
      return false
    }
    if(quantidade === ""){
      alert("Selecione a quantidade vendida")
      return false
    }
    if(quantidade > produtoSelecionado.estoque){
      alert("Quantidade de venda maior que o estoque")
      return false
    }
    if(quantidade <= 0 ){
      alert("A quantidade deve ser maior que zero")
      return false
    }
    return true
  }


  function finalizarVenda(){
    if(!validações()){
      return
    }

    const venda = {
      produto: produtoSelecionado.nome,
      quantidade: quantidade,
      precoUnitario: Number(produtoSelecionado.preco),
      precoTotal: Number(produtoSelecionado.preco)* quantidade,
      data: new Date()
    }

    const vendasSalvas = localStorage.getItem("vendas")
    
    const vendas = vendasSalvas ? JSON.parse(vendasSalvas) : []
    vendas.push(venda)

    localStorage.setItem("vendas", JSON.stringify(vendas))

    const produtosAtualizados = produtos.map((item) =>{
      if(item.id === produto){
        return{
          ...item,
          estoque: item.estoque - quantidade
        }
      }
      return item
    })

    setProdutos(produtosAtualizados)
    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados))
    setProduto("")
    setQuantidade("")
    alert("Venda realizada com sucesso!")
  }

  return (
    <>
    <div className='container-venda'>
      <h1>Realizar Venda</h1>

      <select className='produtoEscolhido' name='produtoEscolhido' value={produto} onChange={escolherProduto} >
        <option value="">Selecione um produto</option>
        {produtos.map((item)=>(
          <option key={item.id} value={item.id}>{item.nome}</option>
        ))}
      </select>
      

      <p className='estoque'>Estoque disponivel: {produtoSelecionado? produtoSelecionado.estoque : "0"}</p>
      <input className='quantidade' type="number" name='quantidade' value={quantidade} onChange={atualizarQuantidade} placeholder='Digite a quantidade que deseja vender'/>
      <p className='preco'>Preço unitário: {produtoSelecionado? produtoSelecionado.preco : "0"}</p>
      <p className='total'>Total: {precoTotal}</p>
      <Button texto="Finalizar Venda" variante={"azul"} onClick={finalizarVenda}/>
    </div>
    <div className='tabela-vendas'>
      <div className='cabecalho-vendas'>
          <span>Produto: </span>
          <span>Quantidade: </span>
          <span>Preço unitário: </span>
          <span>Preço Total: </span>
          <span>Data: </span>
      </div>
      {vendas.map((item, index) =>(
        <div className='linha-venda' key={index}>
          <span>{item.produto}</span>
          <span>{item.quantidade}</span>
          <span>R$ {item.precoUnitario.toFixed(2)}</span>
          <span>R$ {item.precoTotal.toFixed(2)}</span>
          <span>{new Date(item.data).toLocaleString("pt-BR")}</span>
        </div>
      ))}
    </div>
    </>
  )
}

export default Venda