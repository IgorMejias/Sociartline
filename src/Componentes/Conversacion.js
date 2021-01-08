import React,{useState} from 'react';
import { db } from '../Conectar';
import '../Css/Conversacion.css';
import Vistos from './Vistos';

const Conversacion=(props)=>{

    const [Limite,setLimite]=useState();
    const [CargandoMSJ,setCargandoMSJ]=useState('d-none');

const ScrollLoad=(e)=>{

  
    if(e.target.scrollTop===0 && sessionStorage.getItem('ChatLoaded')==='true'){
        var Verificante=sessionStorage.getItem('ActualChat');
        let OldScroll=e.target.scrollHeight
        let UltimoMensaje=(sessionStorage.getItem('UltimoMensaje'))
        setCargandoMSJ('d-block')
       let LastFecha=new Date(UltimoMensaje)
        db.collection('Mensajes').doc(sessionStorage.getItem('ActualChat')).collection('Mensajes').where('Fecha','<=',LastFecha).orderBy('Fecha','desc').limit(10).get().then((item)=>{
            let NewArray=props.Item
            let Collector=[]
            item.forEach((doc)=>{
                Collector.push(doc.data())
            })
            if(Collector.length>0){
            sessionStorage.setItem('UltimoMensaje',Collector[Collector.length-1].Fecha.toDate())
            }
            if(Collector.length>0){
            Collector.forEach((item)=>{
                NewArray.unshift(item)
            })
            
            if(Verificante===sessionStorage.getItem('ActualChat')){
            props.setItem([])
            props.setItem(NewArray)
            }
            sessionStorage.setItem(sessionStorage.getItem('ActualChat'),JSON.stringify(NewArray))
            let NewScroll=document.getElementById('MainConversacion').scrollHeight
            if(NewScroll){
            document.getElementById('MainConversacion').scrollTo(0,NewScroll-OldScroll)
            }
            setCargandoMSJ('d-none')
        }else{
            setCargandoMSJ('d-none')
            setLimite('No existen más mensajes')
        }
        })
    }
    else{
        setLimite('')
    }
}

    return(
<>
    <h4 className='text-center text-white'>{props.DisplayNameChat}</h4>
    <div className='BgConv'>
<div id='MainConversacion' onScroll={ScrollLoad} className='MainConversacion '>
    <b>{Limite}</b>
<div className={'DivCargaConversacion '+CargandoMSJ}><div className='CilindroConversacion'></div></div>
{props.Item.length>0?props.Item.map((item,index)=>{
    return(
<div className='col-12' key={index}>
<p  className={item.Usuario===props.UserName()?'Mensaje MensajePropio':'Mensaje MensajeOtro'}>{item.Texto}</p>
{item.Estado==='Sin leer' && item.Usuario!==props.UserName() && props.UserName()!=='No user'?<Vistos Chat={props.Chat} UserName={props.UserName} User={item.Usuario} Id={item.Id}></Vistos>:<></>}
</div>
    );
    }):<p>Saluda a {props.DisplayNameChat}</p>}
</div>
<div className=' EstadoMensajeDiv'>
<p className='TextoEstadoMensaje'>{props.EstadoMensaje}</p>
</div>
</div>
</>
    );
}

export default Conversacion;
