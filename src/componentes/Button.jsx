import { Link } from 'react-router-dom'
import React from 'react'
import './Button.css'


function Button({texto, onClick, variante, caminho}){
    return(
        caminho ? 
        (<Link to={caminho} className={variante}>{texto}</Link>):
        (<button className={variante} onClick={onClick}>{texto}</button>)
    )
}

export default Button