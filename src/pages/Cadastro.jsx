import React, { useEffect, useState } from 'react'
import Button from '../componentes/Button';
import { useNavigate, useParams } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {

    useEffect(() =>{
        const produtosSalvos = localStorage.getItem("produtos");

        if(produtosSalvos){
            const listaProdutos = JSON.parse(produtosSalvos);
            setProdutos(listaProdutos);
        }

    }, [])

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [estoque, setEstoque] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");
    const [fabricante, setFabricante] = useState("");

    const [produtos, setProdutos]= useState ([]);

    const [idEditando, setIdEditando] = useState(null);

    function atualizarNome(evento){
        setNome(evento.target.value.toUpperCase());
    }

    function atualizarPreco(evento){
        const precoValue = evento.target.value.toUpperCase();
        if(/^\d*(\.\d{0,2})?$/.test(precoValue)){
            setPreco(precoValue)
            }
    }

    function atualizarEstoque(evento){
        const estoqueValue = evento.target.value.toUpperCase();
        if(/^\d*$/.test(estoqueValue)){
            setEstoque(estoqueValue);
        }
    }

    function atualizarCategoria(evento){
        const categoriaValue = evento.target.value.toUpperCase()
        if(/^[\p{L} ]*$/u.test(categoriaValue)){
            setCategoria(categoriaValue);
        }
    }

    function atualizarDescricao(evento){
        setDescricao(evento.target.value.toUpperCase());
    }

    function atualizarFabricante(evento){
        const fabricanteValue = evento.target.value.toUpperCase();
        if(/^[\p{L} ]*$/u.test(fabricanteValue)){
            setFabricante(fabricanteValue);
        }
    }

    function validarCampos(){
        if(nome === ""){
            alert("Digite o nome")
            return false;
        }

        else if(preco ===""){
            alert("Digite o preço")
            return false;
        }

        else if(estoque === ""){
            alert("Digite o estoque")
            return false;
        }

        else if(categoria === ""){
            alert("Digite a categoria")
            return false;
        }
        else if(descricao === ""){
            alert("Digite a descrição")
            return false;
        }

        else if(fabricante === ""){
            alert("Digite o fabricante")
            return false;
        }

        return true;
    }

    function limparInputs(){
        setNome("")
        setPreco("")
        setCategoria("")
        setDescricao("")
        setEstoque("")
        setFabricante("")
    }

    const{id} = useParams();
    const navigate = useNavigate();

    function salvarCadastro(){

        if(!validarCampos()){
            return;
        }

        if(idEditando === null){
            const novoProduto = {
                id: Date.now(),
                nome: nome,
                preco: preco,
                estoque: estoque,
                categoria: categoria,
                descricao: descricao,
                fabricante: fabricante
            }
        
            const listaAtualizada = [...produtos, novoProduto];

            setProdutos(listaAtualizada);
            localStorage.setItem("produtos", JSON.stringify(listaAtualizada));
            limparInputs();

        }else{
            const produtosAtualizados = produtos.map(produto =>{
                if(produto.id === idEditando){
                    return{
                        id: produto.id,
                        nome: nome,
                        preco: preco,
                        estoque: estoque,
                        categoria: categoria,
                        descricao: descricao,
                        fabricante: fabricante
                    }

                }else{
                    return produto;
                }

            })
            
            setProdutos(produtosAtualizados);
            localStorage.setItem("produtos", JSON.stringify(produtosAtualizados))
            navigate("/cadastro")
        }    

    
    }                 


    useEffect(()=>{
        
        if(id){
            const produtoSelecionado = produtos.find(
                produto => produto.id === Number(id)
            );

            if(produtoSelecionado){
                setNome(produtoSelecionado.nome)
                setPreco(produtoSelecionado.preco)
                setCategoria(produtoSelecionado.categoria)
                setDescricao(produtoSelecionado.descricao)
                setEstoque(produtoSelecionado.estoque)
                setFabricante(produtoSelecionado.fabricante)

                setIdEditando(produtoSelecionado.id);
            }
        }else{
            setIdEditando(null);
            limparInputs();
            navigate("/cadastro")
            }
    },[id,produtos]);

  return (
    <div className='container-cadastro'>
        <div className='formulario-cadastro'>
            <h1>Cadastro</h1>
            <div className='container-inputs'>
                <label htmlFor="nome">Nome do produto:</label>
                <input type="text" id='nome' name='nome' onChange={atualizarNome} value={nome}/>

                <label htmlFor="preco">Preço do produto:</label>
                <input type="text" id='preco' name='preco' onChange={atualizarPreco} value={preco}/>
                
                <label htmlFor="estoque">Estoque inicial:</label>
                <input type="text" id='estoque' name='estoque' onChange={atualizarEstoque} value={estoque}/>

                <label htmlFor="categoria">Categoria:</label>
                <input type="text" id='categoria' name='categoria' onChange={atualizarCategoria} value={categoria}/>

                <label htmlFor="fabricante">Fabricante:</label>
                <input type="text" id='fabricante' name='fabricante' onChange={atualizarFabricante} value={fabricante}/>

                <label htmlFor="descricao">Descrição:</label>
                <textarea name="descricao" id="descricao" onChange={atualizarDescricao} value={descricao}></textarea>
            </div>
        <div className='botoes'>
            <Button texto={idEditando === null ? "Cadastrar" : "Salvar alterações"} variante="azul" onClick={salvarCadastro}/>
            <Button texto="Limpar" onClick={limparInputs}/>
        </div>    
        </div>
    </div>
  )
}

export default Cadastro