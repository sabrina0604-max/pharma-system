import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Button from '../componentes/Button';
import './Produtos.css'


const Produtos = () => {

  //Estados utilizados para controlar produtos, busca e ordenação
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("");
  
  const navigate = useNavigate();

  //Recupera o filtro de estoque baixo através da URL
  const [searchParams] = useSearchParams();
  const estoqueBaixo = searchParams.get("estoqueBaixo");

  const produtosEstoqueBaixo = produtos.filter(item => item.estoque < 5);
  let produtoParaBuscar = produtos;

  //Atualiza o campo de busca
  function buscaValue(evento){
    setBusca(evento.target.value)
  }

  //Busca os produtos salvos no LocalStorage
  useEffect(() => {
    const produtosSalvos = localStorage.getItem("produtos");

    if(produtosSalvos){
      const listaProdutos = JSON.parse(produtosSalvos);
      setProdutos(listaProdutos);
    }

  },[]);

  //Exclui o produto e atualiza o LocalStorage
  function excluirProduto(id){

    const confirmar= window.confirm("Deseja realmente excluir este produto ?")
    if(!confirmar){
      return
    }

    const produtosAtualizados = produtos.filter(produto => produto.id !== id);
    setProdutos(produtosAtualizados)
    localStorage.setItem("produtos", JSON.stringify(produtosAtualizados));
  }

  if (estoqueBaixo === "true"){
    produtoParaBuscar = produtosEstoqueBaixo;
  }

  //Filtra os produtos de acordo com o campo de busca
  const produtoBusca = produtoParaBuscar.filter(item => 
    item.nome.toUpperCase().includes(busca.toUpperCase())||
    item.categoria.toUpperCase().includes(busca.toUpperCase())||
    item.fabricante.toUpperCase().includes(busca.toUpperCase())
  )

  let produtosExibidos = produtoParaBuscar;
  

  if(busca !== ""){
    produtosExibidos = produtoBusca;
  }

  //Define as regras de ordenação dos produtos
  const copiaProdutos =[...produtosExibidos]
  const regraOrdenacao = {
    "nome-AZ": (a,b) => a.nome.localeCompare(b.nome),
    "nome-ZA": (a,b) => b.nome.localeCompare(a.nome),
    "preco-+": (a,b) => a.preco - b.preco,
    "preco+-": (a,b) => b.preco - a.preco,
    "estoque-+": (a,b) => a.estoque - b.estoque,
    "estoque+-": (a,b) => b.estoque - a.estoque
  }

  const regraEscolhida = regraOrdenacao[ordenacao]

  if (regraEscolhida){
    copiaProdutos.sort(regraEscolhida)
    produtosExibidos = copiaProdutos
  }

  //Navega para a página de edição do produto
  function editarProduto(id){
    navigate(`/cadastro/${id}`);
  }
 
  //Atualiza a opção de ordenação selecionada
  function escolherOrdem(evento){
    setOrdenacao(evento.target.value)
  }

  function formatarMoeda(valor){
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  }

  return(
    <div className='container-produtos'>
      <h1>Produtos</h1>
      <div className='filtros'>
        <input className='input-busca' type='text' name='text' value={busca} onChange={buscaValue} placeholder='Buscar produto...'/>
        <select className="ordenacao" name="ordenacao" onChange={escolherOrdem}>
          <option value="nome-AZ">Nome A - Z</option>
          <option value="nome-ZA">Nome Z - A</option>
          <option value="preco+-">Preço Maior - Menor</option>
          <option value="preco-+">Preço Menor - Maior</option>
          <option value="estoque+-">Estoque Maior - Menor</option>
          <option value="estoque-+">Estoque Menor - Maior</option>
        </select>
      </div>
      <div className='tabela-container'>
        <table className='tabela-produtos'>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Fabricante</th>
              <th>Estoque</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtosExibidos.length === 0 ? 
            <tr>
              <td colSpan="7">Nenhum produto encontrado</td>
            </tr> :
            produtosExibidos.map((produto) =>(
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{formatarMoeda(Number(produto.preco))}</td>
                <td>{produto.categoria}</td>
                <td>{produto.fabricante}</td>
                <td>{produto.estoque} un.</td>
                <td>{produto.descricao}</td>
                <td>
                  <div className='acoes'>
                    <Button texto="Editar" onClick={()=> editarProduto(produto.id)}></Button>
                    <Button texto="Excluir" onClick={() => excluirProduto(produto.id)}></Button>
                </div>
                </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  )

}

export default Produtos