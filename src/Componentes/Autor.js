import React,{useEffect,useState} from 'react';
import { db } from '../Conectar';
import {Link} from 'react-router-dom';

const Autor=(props)=>{

    const [AName,setAName]=useState('');

    useEffect(()=>{
        let Mounted=true;
let Consulta=db.collection('Usuarios').doc(props.Name).onSnapshot((item)=>{
    if(Mounted && item.data()!==undefined){
    setAName(item.data().DisplayName)
    }
    else{
    Consulta();
    }
})

return ()=>Mounted=false;
    },[props])

    return(
    <>
    <p className='d-inline'>compartió la publicación de <Link to={'/Perfil/'+AName}><b>{AName}</b></Link></p>
    </>
    )
}

export default Autor;