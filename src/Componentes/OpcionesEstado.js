import React,{useState} from 'react';
import { db } from '../Conectar';
import EditarPublicacion from './EditarPublicacion';



const OpcionesEstado=(props)=>{



const [OptionsDisplay,setOptionsDisplay]=useState('d-none')
const [EditarDisplay,setEditarDisplay]=useState('d-none')

const Opciones=(Accion)=>{
switch(Accion){
    case 'd-none':
    setOptionsDisplay('d-block');
    break;
    case 'd-block':
    setOptionsDisplay('d-none');
    break;
    default:
    break;

}
}

const EliminarPosts=()=>{
    sessionStorage.setItem('LoadInicio',false)
   db.collection('Posts').doc(props.Id).delete();
   db.collection('Coments').doc(props.Id).delete();
   db.collection('Likes').doc(props.Id).delete();
   db.collection('Shares').doc(props.Id).delete();
   Opciones('d-block')
   props.Reload();
}

const EditarPost=()=>{
setEditarDisplay('d-block')
}


return(
<div className='MainOpcionesEstado'>
<EditarPublicacion Texto={props.Texto} CerrarOpciones={Opciones} Reload={props.Reload} Display={EditarDisplay} Id={props.Id} setDisplay={setEditarDisplay}></EditarPublicacion>
<button className="d-block OpcionesEstadoBoton" onClick={()=>{Opciones(OptionsDisplay)}}><b>...</b></button>
<div className={"MenuOpcionesEstado "+OptionsDisplay}>
 <button className=" OpcionEstado" onClick={EditarPost}>Editar</button>
<button className=" OpcionEstado" onClick={EliminarPosts}>Eliminar</button>
<button onClick={()=>{Opciones(OptionsDisplay)}} className="OpcionEstado" >Cerrar</button>
</div>
</div>
);

}

export default OpcionesEstado;
