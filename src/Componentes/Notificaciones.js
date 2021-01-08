import React,{useEffect,useState} from 'react';
import { db } from '../Conectar';
import '../Css/Notificaciones.css'
import FotoNotificacion from './FotoNotificacion';
import {Link} from 'react-router-dom';
import AccionComentario from './AccionComentario';

const Notificaciones=(props)=>{

const [NotiText,setNotiText]=useState([]);

useEffect(()=>{
    let Mounted=true;
let Consulta=db.collection('Notificaciones').doc(props.UserName()).collection('Notificaciones').orderBy('Hace','desc').onSnapshot((item)=>{
    if(Mounted){
    let Collector=[]
    let Cont=0;
    item.forEach((doc)=>{
        Collector.push(doc.data())
        if(doc.data().Estado==='Sin ver'){
            Cont+=1
        }
    })
    props.setNotCont(Cont)
    setNotiText(Collector)
}else{
    Consulta();
}
})

    return ()=>Mounted=false;
},[props])

const VerNotificacion=(Id)=>{
db.collection('Notificaciones').doc(props.UserName()).collection('Notificaciones')
.doc(Id).update({
    Estado:'Vista'
})
}

return (
    <>
    <div className={'NotificacionesMain '+props.Display}>
        <button className='CerrarNot' onClick={()=>{props.setDisplay('d-none')}}>Cerrar</button>
        <p>{NotiText.length===0?'Parece que aún no tienes ninguna notificación, interactua y agrega amigos'
    
        :''}</p>
        {NotiText.map((item,index)=>{
            return(
            <Link onClick={()=>{VerNotificacion(item.Id)}} key={index} className='LinkNot' to={'/Post/'+item.PostId}>
            <div className={item.Estado==='Sin ver'?'NotiDiv NotNoVista':'NotiDiv NotVista'} >
                <FotoNotificacion User={item.Usuario}></FotoNotificacion>
                <p className='TextoNot '>{item.Texto}</p>
                <AccionComentario Accion={item.Accion}></AccionComentario>
                {item.Estado==='Vista'?<p className='VistaTexto'>Vista</p>:''}
            </div>
       
            </Link>
            );
        })}
    </div>
    </>
);

}

export default Notificaciones;