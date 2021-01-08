import React,{useState,useEffect} from 'react';
import { db } from '../Conectar';
import {Link} from 'react-router-dom';

const PerfilPicEstado=(props)=>{

const [FotoPerfilE,setFotoPerfilE]=useState();
const [UserDNE,setUserDNE]=useState('');

useEffect(()=>{
    let Mounted=true;
    if(props.UserName!==undefined){
let Consulta=db.collection('Usuarios').doc(props.UserName).onSnapshot((item)=>{
    if(Mounted && item.data()!==undefined){
setFotoPerfilE(item.data().Foto)
setUserDNE(item.data().DisplayName)
    }else{
        Consulta();
    }
})
    }
return ()=>Mounted=false;
},[props])

    return(
        <>
        <Link to={"/Perfil/"+props.UserName}><img className='ProfilePicEstados d-block d-md-inline' height='50' width='50' alt='Profile pic' src={FotoPerfilE}></img></Link>
        <Link to={"/Perfil/"+props.UserName}><b className="ml-2">{UserDNE+' '}</b></Link>
        </>
    );
}

export default PerfilPicEstado;