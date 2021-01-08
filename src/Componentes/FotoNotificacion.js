import React,{useEffect,useState} from 'react';
import { db } from '../Conectar';
import '../Css/FotoNotificacion.css';

const FotoNotificacion=(props)=>{

const [FotNot,setFotNot]=useState();

useEffect(()=>{
let Mounted=true;

let Consulta=db.collection('Usuarios').doc(props.User).onSnapshot((item)=>{
    if(Mounted){
setFotNot(item.data().Foto)
    }else{
        Consulta();
    }
})


return ()=>Mounted=false;
},[props])

return(
<img src={FotNot} className='NotPic' alt='NotiPic'></img>
);

}

export default FotoNotificacion;