import React,{useEffect,useState} from 'react';
import { db } from '../Conectar';
import PerfilPicEstado from './PerfilPicEstado';
import '../Css/Solicitudes.css'

const Solicitudes=(props)=>{

const [UserSolicitudes,setUserSolicitudes]=useState([]);

useEffect(()=>{
    let Mounted=true;
db.collection('Usuarios').doc(props.UserName()).onSnapshot((item)=>{
    if(Mounted){
    let Collect=[]
        item.data().Solicitudes.forEach((dato)=>{
            if(dato.Estado==='Confirmar'){
                Collect.push(dato)
            }
        })
        setUserSolicitudes(Collect)
    }
})
return ()=>Mounted=false;
},[props])

    return(
    <div className='container-fluid'>
        {UserSolicitudes.map((item,index)=>{
            return(
                <div key={index} className='container'>
                    <h4>Solicitudes</h4>
                <div className='row'>
                    <div className='DivSolicitud'>
                    <PerfilPicEstado UserName={item.Usuario}></PerfilPicEstado>
                    </div>
                    <div className=''>
                    <button className='Action Confirmar mr-2' onClick={()=>props.EnviarSolicitud('Confirmar',item.Usuario)}></button>
                    <button className='Action Rechazar' onClick={()=>props.EnviarSolicitud('Cancelar',item.Usuario)}></button>
                    </div>
                </div>
                </div>
            );
        })}
    </div>);
}

export default Solicitudes;