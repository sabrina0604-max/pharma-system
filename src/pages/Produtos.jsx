import { useNavigate, useSearchParams } from 'react-router-dom';

import React, { useEffect, useState } from 'react'
import Button from '../componentes/Button';
import './Produtos.css'


const Produtos = () => {

  const [produtos, setProdutos] = useState([]);

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

  function editarProduto(id){
    navigate(`/cadastro/${id}`);
  }

  return(
    <div className='container-produtos'>
      <h1>Produtos</h1>
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
                <td><Button texto="Editar" onClick={()=> editarProduto(produto.id)}></Button></td>
                <td><Button texto="Excluir" onClick={() => excluirProduto(produto.id)}></Button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  )

}

export default Produtos