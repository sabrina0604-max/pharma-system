import React, { useEffect, useState } from 'react'
import Button from '../componentes/Button'
import './Venda.css'

const Venda = () => {

  // Estados utilizados na tela de vendas
  const [produto, setProduto] = useState("")
  const [produtos, setProdutos] = useState([])
  const [quantidade, setQuantidade] = useState("")
  const [vendas, setVendas] = useState([])

  // Busca os produtos cadastrados no LocalStorage ao carregar a página
  useEffect(()=>{
    const produtosSalvos = localStorage.getItem("produtos")

    if(produtosSalvos){
      const listaProdutos = JSON.parse(produtosSalvos)
      setProdutos(listaProdutos)
    }
  }, [])

  // Busca as vendas registradas no LocalStorage ao carregar a página
  useEffect(()=>{
    const vendasSalvas = localStorage.getItem("vendas")

    if(vendasSalvas){
      const listaVendas = JSON.parse(vendasSalvas)
      setVendas(listaVendas)
    }
  },[])
  
  // Atualiza o produto selecionado pelo usuário
  function escolherProduto(evento){
    setProduto(Number(evento.target.value))
  }

  // Atualiza a quantidade da venda e mantém o campo vazio quando necessário
  function atualizarQuantidade(evento){
    const valor = evento.target.value

    if(valor === ""){
      setQuantidade("")
    }else{
      setQuantidade(Number(evento.target.value))
    }
  }

  // Localiza na lista o produto selecionado pelo usuário
  const produtoSelecionado = produtos.find((item) =>
    item.id === produto
  )

  //Calcula o valor total da venda somente quando há estoque suficiente
  let precoTotal = ""

  if(produtoSelecionado){
    if(quantidade <= produtoSelecionado.estoque){
      precoTotal = Number(produtoSelecionado.preco) * quantidade
    }
  }

  //Valida os dados antes de permitir a finalização da venda
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

  //Registra a venda, atualiza o estoque e salva os dados no Local Estorage
  function finalizarVenda(){
    if(!validações()){
      return
    }

    const venda = {
      id: Date.now(),
      produtoId: produtoSelecionado.id,
      produto: produtoSelecionado.nome,
      quantidade: quantidade,
      precoUnitario: Number(produtoSelecionado.preco),
      precoTotal: Number(produtoSelecionado.preco)* quantidade,
      data: new Date()
    }

    const vendasSalvas = localStorage.getItem("vendas")
    const vendas = vendasSalvas ? JSON.parse(vendasSalvas) : []
    const vendasAtualizadas = [...vendas, venda]
    setVendas(vendasAtualizadas)
    localStorage.setItem("vendas", JSON.stringify(vendasAtualizadas))

    const produtosAtualizados = produtos.map((item) =>{
      if(item.id === produto){
        return{
          ...item,
          estoque: item.estoque - quantidade
        }
      }
      return item
    })

    // Salva o estoque atualizado e limpa os campos da venda
    setProdutos(produtosAtualizados)
    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados))
    setProduto("")
    setQuantidade("")
    alert("Venda realizada com sucesso!")
  }

  // Cria uma nova lista ordenada sem alterar o estado original das vendas
  const vendasOrdenadas = [...vendas].sort((a,b) =>{
    return new Date(b.data) - new Date(a.data)
  })

  // Exclui uma venda e devolve a quantidade vendida ao estoque
  function excluirVenda(id){

    const confirmar= window.confirm("Deseja realmente excluir esta venda?")
    if(!confirmar){
      return
    }

    const venda = vendas.find(item => item.id === id)

    const vendasAtualizada = vendas.filter(item => item.id !== id);
    setVendas(vendasAtualizada)
    localStorage.setItem("vendas", JSON.stringify(vendasAtualizada))

    const produtosAtualizados = produtos.map((item)=>{
      if(item.id === venda.produtoId){
        return{
          ...item,
          estoque: item.estoque + venda.quantidade
        }
      }
      return item
    })

    localStorage.setItem("produtos", JSON.stringify(produtosAtualizados))
  }

  // Formata valores númericos para padrão de moeda brasileira
  function formatarMoeda(valor){
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
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
      <p className='total'>Total: {formatarMoeda(precoTotal)}</p>
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
      {vendasOrdenadas.map((item) =>(
        <div className='linha-venda' key={item.id}>
          <span>{item.produto}</span>
          <span>{item.quantidade}</span>
          <span>{formatarMoeda(item.precoUnitario)}</span>
          <span>{formatarMoeda(item.precoTotal)}</span>
          <span>{new Date(item.data).toLocaleString("pt-BR")}</span>
          <div className='botoes'>
            <Button texto="Excluir venda" onClick={()=> excluirVenda(item.id)}/>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Venda