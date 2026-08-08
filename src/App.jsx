import { Routes, Route } from 'react-router-dom'

import Cadastro from './pages/Cadastro'
import Produtos from './pages/Produtos'
import Home from './pages/Home'
import Venda from './pages/Venda'
import Navbar from './componentes/Navbar'

import './App.css'



function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/cadastro" element={<Cadastro/>} />
      <Route path="/cadastro/:id" element={<Cadastro/>}/>
      <Route path="/produtos" element = {<Produtos/>} />
      <Route path="/" element = {<Home/>}/>
      <Route path='/venda' element={<Venda/>}/>
    </Routes>
  </>
  )
}

export default App
