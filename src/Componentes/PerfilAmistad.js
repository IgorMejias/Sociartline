import React,{useEffect,useState} from 'react';
import { db } from '../Conectar';

const PerfilAmistad=(props)=>{

const [EstadoAmistad,setEstadoAmistad]=useState();

useEffect(()=>{

    let Mounted=true;
    
db.collection('Usuarios').doc(props.Usuario).onSnapshot((DatosUser)=>{
    if(Mounted){
        const Encontrar=(objeto)=>{
            return objeto.Usuario===props.UserName()
        }
        
        var Relacion=DatosUser.data().Solicitudes;
        if(Relacion.find(Encontrar)!==undefined){
        switch(Relacion.find(Encontrar).Estado){
            case 'Confirmar':
                setEstadoAmistad(<button className="btn btn-danger container col-10" onClick={()=>props.EnviarSolicitud('Cancelar',props.Usuario,Relacion.find(Encontrar).Conversacion)}>Cancelar solicitud</button>)  
             break;

             case 'Enviada':
                setEstadoAmistad(<button className="btn btn-success container col-10" onClick={()=>props.EnviarSolicitud('Confirmar',props.Usuario)}>Confirmar</button>)  
             break;

             case 'Aceptada':
                setEstadoAmistad(<button className="btn btn-danger container col-10" onClick={()=>props.EnviarSolicitud('Cancelar',props.Usuario,Relacion.find(Encontrar).Conversacion)}>Eliminar de mis amigos</button>)  
             break;
                default:
           
                 break;
        }
    }else{
        setEstadoAmistad(<button className="btn btn-primary container col-10" onClick={()=>props.EnviarSolicitud('Enviar',props.Usuario)}>Agregar</button>)
    }
        

    }
    })

    return ()=> Mounted=false;
},[props])


    return(
        <>
        {EstadoAmistad}
        </>
    );
}

export default PerfilAmistad;