import React, {useState} from 'react';
import { db } from '../Conectar';
import Contactos from './Contactos';
import Conversacion from './Conversacion';
import '../Css/Chat.css';
import firebase from 'firebase/app';

const Chat=(props)=>{

const [DisplayNameChat,setDisplayNameChat]=useState()
const [Mensajes,setMensajes]=useState([]);
const [CrearMensaje,setCrearMensaje]=useState({
    Texto:''
})
const [DisplayForm,setDisplayForm]=useState('d-none');
const [EstadoMensaje,setEstadoMensaje]=useState('');

const EnviarMensaje=async()=>{
setEstadoMensaje('Enviando...')
    let Id=props.GenerarId();
    document.getElementById('TextAreaMensaje').value='';

   await db.collection('Mensajes').doc(sessionStorage.getItem('ActualChat')).collection('Mensajes').doc(Id).set({
        Id:Id,
        Usuario:props.UserName(),
        DisplayName:props.UserDN(),
        Texto:CrearMensaje.Texto,
        Estado:'Sin leer',
        Fecha:firebase.firestore.FieldValue.serverTimestamp()
    }).then(()=>{
       setEstadoMensaje('Enviado')
       db.collection('Mensajes').doc(sessionStorage.getItem('ActualChat')).update({
          SinLeer:sessionStorage.getItem('ActualChatUserName')
       })
    }) 

}

const AsignarMensaje=(e)=>{
const {name,value}=e.target
setCrearMensaje({...CrearMensaje,[name]:value})
}

const EnviarConEnter=(event)=>{
 if(event.keyCode===13 && !event.shiftKey && window.innerWidth>768){
    event.preventDefault();
    EnviarMensaje();
}
}

    return(
        <div className='container-fluid MainChat'>
        <div className='row'>
        <Contactos setEstadoMensaje={setEstadoMensaje} GenerarId={props.GenerarId} DPform={setDisplayForm} setMensajes={setMensajes} setDisplayNameChat={setDisplayNameChat} UserName={props.UserName}></Contactos>
        </div>
        <div className={'row '+DisplayForm}>
        <Conversacion EstadoMensaje={EstadoMensaje} DisplayNameChat={DisplayNameChat}  UserName={props.UserName} setItem={setMensajes} Item={Mensajes}></Conversacion>
        </div>
        <form className={'FormMensaje text-center '+DisplayForm} onSubmit={(e)=>{e.preventDefault();}}>
            <textarea id='TextAreaMensaje' onKeyDown={EnviarConEnter} className='TextAreaMensaje ' name='Texto' onChange={AsignarMensaje}></textarea>
            <input onClick={EnviarMensaje} className='EnviarMensaje ' type='submit' value=""></input>
        </form>
       
        </div>
    );
}

export default Chat;