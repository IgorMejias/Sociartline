import React,{useState} from 'react';
import '../Css/LoginHeader.css';
import {withRouter} from 'react-router-dom';
import {useFirebaseApp} from 'reactfire';
import 'firebase/auth';
import { db } from '../Conectar';

const LoginHeader=(props)=>{

const firebase=useFirebaseApp();
const [CargaVis,setCargaVis]=useState('invisible')  

const [Datos,setDatos]=useState({
    Usuario:'',
    Pass:''
})

const Asignar=(e)=>{
const {name,value}=e.target
    setDatos({...Datos,[name]:value})
}

const EnviarDatos=async(e)=>{
    e.preventDefault();
    if(/.*@.*\..{3}/.test(Datos.Usuario) && Datos.Pass.length>5){
     setCargaVis('visible')
     try{
       const VerifDatos= await firebase.auth().signInWithEmailAndPassword(Datos.Usuario,Datos.Pass)
       if(VerifDatos){
   
      db.collection('Usuarios').where('Mail','==',firebase.auth().currentUser.email).get().then((item)=>{
        setCargaVis('invisible')
        props.Ver('d-block')
        localStorage.setItem('Usuario',item.docs[0].data().Nombre)
        localStorage.setItem('DisplayName',item.docs[0].data().DisplayName)
       props.history.push('/')
       props.setTheme('MainBlack')
    })

}
   
     }catch(error){
         console.log(error)
         switch(error.code){
            case 'auth/invalid-email':
            alert('La dirección de correo ingresada no es valida')
            break;

            case 'auth/user-not-found':
            alert('Usuario no registrado')
            break;

            case 'auth/wrong-password':
            alert('Clave invalida')
            break;

            default:
            alert('Error de conexión')
            break;

         }
         setCargaVis('invisible')
     }
       
    }
    else{
        alert('Usuario o contraseña invalidos')
    }
}

    return(
<>
<div className={'mt-2 DivInicioSesion '+CargaVis}><div className='CilindroInicioSesion'></div></div>
<header className='row text-white Header'>
            <img className=' LogoHeader' src='./Logo.png' alt='Logo'></img>
            <h1 className='col-9 col-md-2 text-center'><b>Sociartline</b></h1>
        <form className='col-12 col-md-9 container mt-2 text-center' onSubmit={EnviarDatos}>
            <h2 className='d-block d-md-none'>Iniciar sesión</h2>
        <input type='text' placeholder='Correo electrónico' name='Usuario' className='ml-2 d-inline form-control col-11 col-md-3 container text-center mb-1' onChange={Asignar}></input>
        <input type='password' placeholder='Escribir contraseña' name='Pass' className='ml-2 d-inline form-control col-11 col-md-3 container text-center mb-1' onChange={Asignar}></input>
        <input type='submit' value='Ingresar' className='ml-2 d-inline form-control container col-6 col-md-2 mb-2'></input>
        </form>
        <button className={'d-block d-md-none mb-2 col-12 container '+props.BotonMostrar} onClick={props.Funcion}>Registrarse</button>
</header>


</>
    );

}

export default withRouter(LoginHeader);