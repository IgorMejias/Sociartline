import React,{useEffect} from 'react';
import { db } from '../Conectar';

const Vistos=(props)=>{
useEffect(()=>{
let Mounted=true;
const Leer=async()=>{

    db.collection('Mensajes').doc(sessionStorage.getItem('ActualChat')).collection('Mensajes').doc(props.Id).update({
        Estado:'Visto'
    })

}
if(Mounted){
Leer();
}

return ()=>Mounted=false;

},[props])

    return (
    <></>
    );
}


export default Vistos;