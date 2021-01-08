import React,{useState} from 'react';
import { db } from '../Conectar';
import '../Css/OpcionesComentarios.css';

const OpcionesComentarios=(props)=>{

    const [DisplayOCM,setDisplayOCM]=useState('d-none')

    

    const MostrarOpciones=()=>{
        switch(DisplayOCM){
            case 'd-none':
            setDisplayOCM('d-block')
            break;

            case 'd-block':
            setDisplayOCM('d-none')
            props.setEditar('d-none')
            break;

            default:
            break;
        }
    }

    const Accionar=(Accion)=>{
        switch(Accion){
            case'Borrar':
            db.collection('Posts').doc(props.MainId).collection('Comentarios').doc(props.Id).delete()
            MostrarOpciones();
            break;

            case'Editar':
            props.setEditar('d-block')
            break;
            default:
            break;
        }
    }

return (
    <div className='MainOpcionesCM'>
    <button className='BotonOpciones' onClick={MostrarOpciones}><b>...</b></button>
    <div className={'DivOCM '+DisplayOCM}>
        {props.UserName()===props.Usuario?
        <button onClick={()=>Accionar('Editar')} className='OpcionCM'>Editar</button>:<></>
    } 
        <button onClick={()=>Accionar('Borrar')} className='OpcionCM'>Borrar</button>
        <button onClick={MostrarOpciones} className='OpcionCM'>Cerrar</button>
    </div>
    </div>
)
}

export default OpcionesComentarios;