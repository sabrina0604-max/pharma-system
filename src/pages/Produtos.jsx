import { useNavigate, useSearchParams } from 'react-router-dom';

import React, { useEffect, useState } from 'react'
import Button from '../componentes/Button';
import './Produtos.css'


const Produtos = () => {

  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");

  function buscaValue(evento){
    setBusca(evento.target.value)
  }

  const produtoBusca = produtos.filter(item => item.nome.toLowerCase().includes(busca.toLowerCase()))

  useEffect(() => {
    const produtosSalvos = localStorage.getItem("produtos");

    if(produtosSalvos){
      const listaProdutos = JSON.parse(produtosSalvos);
      setProdutos(listaProdutos);
    }

  },[]);

  function excluirProduto(id){
    const produtosAtualizados = produtos.filter(produto => produto.id !== id);
    setProdutos(produtosAtualizados)
    localStorage.setItem("produtos", JSON.stringify(produtosAtualizados));
  }

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const estoqueBaixo = searchParams.get("estoqueBaixo");

  const produtosEstoqueBaixo = produtos.filter(item => item.estoque < 5);
  let produtosExibidos = produtos;

  if (estoqueBaixo === "true"){
    produtosExibidos = produtosEstoqueBaixo;
  }

  if(busca !== ""){
    produtosExibidos = produtoBusca;
  }

  function editarProduto(id){
    navigate(`/cadastro/${id}`);
  }

  return(
    <div className='container-produtos'>
      <h1>Produtos</h1>
      <input className='input-busca' type='text' name='text' value={busca} onChange={buscaValue} placeholder='Buscar produto...'/>
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
            {produtosExibidos.map((produto) =>(
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>R$ {produto.preco}</td>
                <td>{produto.categoria}</td>
                <td>{produto.fabricante}</td>
                <td>{produto.estoque}</td>
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