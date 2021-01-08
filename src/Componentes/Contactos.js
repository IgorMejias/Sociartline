import React,{useEffect,useState} from 'react';
import { db } from '../Conectar';
import FotoContacto from './FotoContacto';
import '../Css/Contactos.css';


const Contactos=(props)=>{

const [Lista,setLista]=useState([]);
const [CDisplay,setCDisplay]=useState('d-block');

  useEffect(()=>{
      let Mounted=true;

      if(Mounted){
    db.collection('Usuarios').doc(props.UserName()).get().then((item)=>{
        if(item.data()!==undefined){
        let List=item.data().Solicitudes;
        let Collector=[]
        List.forEach((data)=>{
            if(data.Estado==='Aceptada'){
                Collector.push(data)
            }
        })
        if(Mounted){
        setLista(Collector)
        }
    }
    })
}
return ()=>Mounted=false;
  },[props])  



  
const CargarConv=async(Chat,User)=>{
    props.setEstadoMensaje('')
      let FirsLoad=true
    var SessionID=props.GenerarId();
  
      props.setMensajes([])
    sessionStorage.setItem('ActualChatUserName',User)
 sessionStorage.setItem('ChatSession',SessionID)
sessionStorage.setItem('ChatLoaded',false)
 sessionStorage.setItem('ActualChat',Chat)

db.collection('Mensajes').doc(Chat).collection('Mensajes').orderBy('Fecha','desc').limit(10).get().then((item)=>{  

    let Collector=[]
        item.forEach((doc)=>{
        Collector.unshift(doc.data())
        })
        if(Collector[0]!==undefined && Collector[0]!==null){
            if(Collector[0].Fecha!==null){
            sessionStorage.setItem('UltimoMensaje',(Collector[0].Fecha.toDate()))
            }
             }
   if(sessionStorage.getItem('ActualChat')===Chat && window.location.pathname==='/Chat'){
    props.setMensajes(Collector)
    sessionStorage.setItem('ChatLoaded',true)
    sessionStorage.setItem(Chat,JSON.stringify(Collector))
  let Scroll= document.getElementById('MainConversacion');
  if(Scroll){
 Scroll.scrollTop=Scroll.scrollHeight;
  }
   }
}).then(()=>{
    db.collection('Mensajes').doc(Chat).update({
        SinLeer:''
    })
    AbrirCerrarContactos('Cerrar');
})


let Consulta= db.collection('Mensajes').doc(Chat).collection('Mensajes').orderBy('Fecha','desc').limit(10).onSnapshot((item)=>{

if(!FirsLoad){

if(sessionStorage.getItem('ChatSession')===SessionID && window.location.pathname==='/Chat'){
 
 let NewArray=JSON.parse(sessionStorage.getItem(Chat))
 item.docChanges().forEach((doc)=>{
     if(doc.type==='added'){
 NewArray.push(doc.doc.data())
 if(doc.doc.data().Usuario!==props.UserName()){
     db.collection('Mensajes').doc(Chat).update({
         SinLeer:''
     })
 }
     }
})
props.setMensajes(NewArray)
sessionStorage.setItem(Chat,JSON.stringify(NewArray))
let Scroll= document.getElementById('MainConversacion');
if(Scroll){
    let scrollHeight=(Scroll.clientHeight*(Scroll.offsetHeight/Scroll.clientHeight))+Scroll.scrollTop;
    if(scrollHeight>=Scroll.scrollHeight-(Scroll.scrollHeight*20/100)){
Scroll.scrollTop=Scroll.scrollHeight;
    }
}
}else{
    Consulta();
}
}

setTimeout(()=>{
FirsLoad=false;
},2000)
})

props.DPform('d-block')
}

const AbrirCerrarContactos=(Accion)=>{
    switch(Accion){
        case 'Cerrar':
        setCDisplay('d-none')
        break;
        case 'Abrir':
        setCDisplay('d-block')
        break;
        default:
        break;
    }
}

    return (
    <>
    <div className='container text-center text-white'>
    </div>
    <button className='ContactsAbrir' onClick={()=>AbrirCerrarContactos('Abrir')}></button>
<div className={'ContactsMainDiv '+CDisplay}>
    <button className='ContactsCerrar' onClick={()=>AbrirCerrarContactos('Cerrar')}>Cerrar</button>
    <b>{Lista.length===0?'Los amigos que agregues apareceran en esta sección':''}</b>
    {Lista.map((item,index)=>{
        return(
        <div className=' ContactDiv' id='Contacto' onClick={()=>{CargarConv(item.Conversacion,item.Usuario)}} key={index} >
            <FotoContacto Chat={item.Conversacion} UserName={props.UserName} setDisplayNameChat={props.setDisplayNameChat} User={item.Usuario}></FotoContacto>
        </div>
        );
    })}
</div>
</>

    );
}

export default Contactos;