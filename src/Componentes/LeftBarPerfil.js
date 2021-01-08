import React,{useState,useEffect} from 'react';
import {db} from '../Conectar'
import {Link, useParams} from 'react-router-dom';
import '../Css/LeftBarPerfil.css'
import MenuCambiarFoto from './MenuCambiarFoto';
import PerfilAmistad from './PerfilAmistad';
import Solicitudes from './Solicitudes';
import firebase from 'firebase/app';



const LeftBarPerfil=(props)=>{

const [FotoDePerfil,setFotoDePerfil]=useState('')
const [Estado,setEstado]=useState('')
const [SobreMi,setSobreMi]=useState('')
const [UserDN,setUserDN]=useState('')
const [CargandoFoto,setCargandoFoto]=useState('visible')
const [LeftBarItems,setLeftBarItems]=useState('invisible')
const [MenuFotoDisplay,setMenuFotoDisplay]=useState('d-none');
const Usuario=useParams().User;

useEffect(()=>{
    let Mounted=true;

 

const BuscarInfo=async()=>{
   await db.collection('Usuarios').doc(Usuario).onSnapshot((DatosUser)=>{
  if(Mounted){
   setFotoDePerfil(DatosUser.data().Foto)
   setEstado(DatosUser.data().Estado)
   setCargandoFoto('invisible')
    setLeftBarItems('visible')
    setSobreMi(DatosUser.data().SobreMi)
    setUserDN(DatosUser.data().DisplayName)
  }

})
    }
    BuscarInfo();



    return ()=>Mounted=false;
},[Usuario,props])

const ActivarEdicion=()=>{
    if(Usuario===props.UserName()){
        return <button onClick={AbrirEditor} className='CambiarFoto'></button>
    }
}

const AbrirEditor=()=>{
    setMenuFotoDisplay('d-block')
}

const EnviarSolicitud=(Accion,User,Conversacion)=>{
var ID=props.GenerarId();

    switch(Accion){
    case "Enviar":
        db.collection('Usuarios').doc(User).update('Solicitudes',firebase.firestore.FieldValue.arrayUnion({
            Usuario:props.UserName(),
            Estado:'Confirmar'
        }))
    
        db.collection('Usuarios').doc(props.UserName()).update('Solicitudes',firebase.firestore.FieldValue.arrayUnion({
            Usuario:User,
            Estado:'Enviada'
        }))
    break;
    case "Cancelar":
    db.collection('Usuarios').doc(User).update('Solicitudes',firebase.firestore.FieldValue.arrayRemove({
        Usuario:props.UserName(),
        Estado:'Enviada'
    }))

    db.collection('Usuarios').doc(props.UserName()).update('Solicitudes',firebase.firestore.FieldValue.arrayRemove({
        Usuario:User,
        Estado:'Confirmar'
    }))

    db.collection('Usuarios').doc(User).update('Solicitudes',firebase.firestore.FieldValue.arrayRemove({
        Usuario:props.UserName(),
        Estado:'Confirmar'
    }))

    db.collection('Usuarios').doc(props.UserName()).update('Solicitudes',firebase.firestore.FieldValue.arrayRemove({
        Usuario:User,
        Estado:'Enviada'
    }))

    if(Conversacion!==undefined){
    db.collection('Usuarios').doc(User).update('Solicitudes',firebase.firestore.FieldValue.arrayRemove({
        Usuario:props.UserName(),
        Estado:'Aceptada',
        Conversacion:Conversacion
    }))

    db.collection('Usuarios').doc(props.UserName()).update('Solicitudes',firebase.firestore.FieldValue.arrayRemove({
        Usuario:User,
        Estado:'Aceptada',
        Conversacion:Conversacion
    }))
}else{
    db.collection('Usuarios').doc(User).update('Solicitudes',firebase.firestore.FieldValue.arrayRemove({
        Usuario:props.UserName(),
        Estado:'Aceptada'
    }))

    db.collection('Usuarios').doc(props.UserName()).update('Solicitudes',firebase.firestore.FieldValue.arrayRemove({
        Usuario:User,
        Estado:'Aceptada'
    }))
}

  break;
   
  case 'Confirmar':

    db.collection('Usuarios').doc(User).update('Solicitudes',firebase.firestore.FieldValue.arrayRemove({
        Usuario:props.UserName(),
        Estado:'Enviada'
    }))

    db.collection('Usuarios').doc(props.UserName()).update('Solicitudes',firebase.firestore.FieldValue.arrayRemove({
        Usuario:User,
        Estado:'Confirmar'
    }))

  db.collection('Mensajes').where('Usuarios','==',props.UserName()+User).get().then((item)=>{
    if(item.docs.length>0){
        db.collection('Usuarios').doc(User).update('Solicitudes',firebase.firestore.FieldValue.arrayUnion({
            Usuario:props.UserName(),
            Estado:'Aceptada',
            Conversacion:item.docs[0].data().ID
        }))
    
        db.collection('Usuarios').doc(props.UserName()).update('Solicitudes',firebase.firestore.FieldValue.arrayUnion({
            Usuario:User,
            Estado:'Aceptada',
            Conversacion:item.docs[0].data().ID
        }))
    }
    else{
  db.collection('Mensajes').where('Usuarios','==',User+props.UserName()).get().then((item)=>{
    if(item.docs.length>0){
        db.collection('Usuarios').doc(User).update('Solicitudes',firebase.firestore.FieldValue.arrayUnion({
            Usuario:props.UserName(),
            Estado:'Aceptada',
            Conversacion:item.docs[0].data().ID
        }))
    
        db.collection('Usuarios').doc(props.UserName()).update('Solicitudes',firebase.firestore.FieldValue.arrayUnion({
            Usuario:User,
            Estado:'Aceptada',
            Conversacion:item.docs[0].data().ID
        }))
    }
    else{
        db.collection('Usuarios').doc(User).update('Solicitudes',firebase.firestore.FieldValue.arrayUnion({
            Usuario:props.UserName(),
            Estado:'Aceptada',
            Conversacion:ID
        }))
    
        db.collection('Usuarios').doc(props.UserName()).update('Solicitudes',firebase.firestore.FieldValue.arrayUnion({
            Usuario:User,
            Estado:'Aceptada',
            Conversacion:ID
        }))
        
        db.collection('Mensajes').doc(ID).set({
            Usuarios:props.UserName()+User,
            ID:ID,
            ArrayUsers:[props.UserName(),User]
            
        })

    }


        })
    }
  })
   

   
  
  break;
  
  default:
  break;
    }
  
  }


    return(
        <>
        <MenuCambiarFoto 
        Usuario={Usuario}
        MenuFotoDisplay={MenuFotoDisplay} setMenuFotoDisplay={setMenuFotoDisplay}
        setFotoDePerfil={setFotoDePerfil} setCargandoFoto={setCargandoFoto}
        ></MenuCambiarFoto>


        <div className=' col-md-12 col-lg-3 LeftBarPerfil'>
        <div className={'DivCargaPerfil '+CargandoFoto}><div className='CilindroPerfil'></div></div>
            <div className={'row '+LeftBarItems}>
            

                <div className='FotoPerfilDiv col-12'>
                 <img alt='Foto de Perfil' onClick={props.AbrirFoto} src={FotoDePerfil} className='FotoDePerfil'></img>
                 {ActivarEdicion()}
                </div>

                <h2 className='col-12 NombreLeftBarPerfil'>{UserDN}</h2>
                {Usuario===props.UserName()?<Link to='/Configuracion' className='ConfigurarPerfil'></Link>:<></>}

                <div className=' EstadoPerfil col-12'>
                <h6>Estado:</h6>
                <p>{Estado}</p>
                </div>

                <div className='PerfilInfo text-center col-12'>
                <h5>Sobre mi</h5>
                <p className='text-left'>{SobreMi}</p>
                </div>
                
               {Usuario===props.UserName()?<Solicitudes EnviarSolicitud={EnviarSolicitud} UserName={props.UserName}></Solicitudes>:<PerfilAmistad EnviarSolicitud={EnviarSolicitud} Usuario={Usuario} UserName={props.UserName}></PerfilAmistad>}
            </div>
        
        </div>

        </>
    );
}

export default LeftBarPerfil;