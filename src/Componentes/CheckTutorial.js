import React,{useEffect,useState} from 'react';
import { db } from '../Conectar';

const CheckTutorial=(props)=>{

useEffect(()=>{
let Titulos=['¡Bienvenido!','Amistades','Notificaciones','Chat','Publicaciones','Perfil']

db.collection('Usuarios').doc(props.UserName()).get().then((item)=>{
if(item.data().Tutorial==='Incomplete'){
    props.setTutorial({...props.Tutorial,
        Display:'d-block',
        Titulo:Titulos[props.Tutorial.Step]})
}
})
},[props])


return (
<>
</>

);
}


export default CheckTutorial;

