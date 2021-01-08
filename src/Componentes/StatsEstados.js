import React, { useState } from 'react';
import '../Css/StatsEstados.css';
import Comentar from './Comentar';
import Comentarios from './Comentarios';

const StatsEstados=(props)=>{


const [DisplayComents,setDisplayComents]=useState('d-none')
const [TextoComents,setTextoComents]=useState('Mostrar comentarios')

const VerComentarios=()=>{
   switch(DisplayComents){
       case 'd-none':
           setDisplayComents('d-block')
           setTextoComents('Ocultar comentarios')
           break;
        case 'd-block':
            setDisplayComents('d-none')
            setTextoComents('Mostrar comentarios')
            break;
        default:
        break;
   }
}




return(
<div className=" col-12 StatsDiv">

<div className='row'>

<Comentar User={props.Autor} setTexto={setTextoComents} GenerarId={props.GenerarId} Id={props.Id} DisplayComents={setDisplayComents} UserName={props.UserName}></Comentar>
<button className="MostrarComentarios col-12" onClick={VerComentarios}>{TextoComents}</button>
<Comentarios Autor={props.Autor} UserName={props.UserName} Id={props.Id} Display={DisplayComents} ></Comentarios>
</div>

</div>
);
}

export default StatsEstados;