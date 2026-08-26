import React, { useEffect, useState } from 'react'
import Button from '../componentes/Button'
import './Venda.css'

const Venda = () => {

  const [produto, setProduto] = useState("")
  const [produtos, setProdutos] = useState([])
  const [quantidade, setQuantidade] = useState("")

  useEffect(()=>{
    const produtosSalvos = localStorage.getItem("produtos")

    if(produtosSalvos){
      const listaProdutos = JSON.parse(produtosSalvos)
      setProdutos(listaProdutos)
    }
  }, [])
  
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
  )
}

export default Venda