import React, { useEffect, useState } from 'react'
import './CardResumo.css'
import { Link } from 'react-router-dom';

function CardResumo ({icone, titulo, valor, caminho}){

  return(
    <Link to={caminho} className='card-link'>
      <div className='card-resumo'>
          <div className='icone'>{icone}</div>

          <h3>{titulo}</h3>

          <h2>{valor}</h2>
      </div>
    </Link>
  )
}

export default CardResumo;