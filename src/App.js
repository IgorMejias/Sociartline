import React, { useState,useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Login from './Componentes/Login'
import Inicio from './Componentes/Inicio';
import NavBar from './Componentes/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Perfil from './Componentes/Perfil';
import 'firebase/auth';
import {useUser} from 'reactfire';
import VisorDeImagenes from './Componentes/VisorDeImagenes';
import Chat from './Componentes/Chat';
import Post from './Componentes/Posts';
import Configuracion from './Componentes/Configuracion';
import TutorialComp from './Componentes/TutorialComp';




function App(props) {

  const [Mostrar,setMostrar]=useState('d-block')
  const [FotoVisor,setFotoVisor]=useState('')
  const [FotoVisorDisplay,setFotoVisorDisplay]=useState('d-none')
  const [InicioLoad,setInicioLoad]=useState(false)
  const [LoadPerfil,setLoadPerfil]=useState(false)
  const [MainTheme,setMainTheme]=useState('Main');


  const GenerarId=()=>{
    let Chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let FinalId='';
	for(let i=0; i<10; i++){
	FinalId+=Chars.charAt(Math.round(Math.random()*Chars.length));
	}
	
	return FinalId;
};

let UserVer=useUser();

const BusquedaValores=(Nombre)=>{
  let Acum='';
  let Array=[];
  for(let i=0;i<Nombre.length;i++){
    Acum+=Nombre[i];
    Array.push(Acum)
  }
Acum='';
  for(let i=0;i<Nombre.length;i++){
    Acum+=Nombre[i].toLowerCase();
    Array.push(Acum)
  }
  return Array;
  }

  useEffect(()=>{ 

    sessionStorage.setItem('LoadInicio',false)
  },[UserVer])


  const NombreUsuario=()=>{
    if(localStorage.getItem('Usuario')){
        return localStorage.getItem('Usuario');
    }
    else{
        return 'No user';
    }
}

const UserDN=()=>{
  if(localStorage.getItem('DisplayName')){
      return localStorage.getItem('DisplayName');
  }
  else{
      return 'No user';
  }
}

  const Loged=()=>{
 let data=useUser();
    if(data==='' || data===null){
    return false
    }
    else{
      return true
    }
  }

  const AbrirFoto=(e)=>{
    setFotoVisorDisplay('d-flex')
    setFotoVisor(e.target.src)
 }

 const CerrarFoto=()=>{
  setFotoVisorDisplay('d-none')
}


  return (
    <>
 <VisorDeImagenes Cerrar={CerrarFoto} SRC={FotoVisor} Display={FotoVisorDisplay}></VisorDeImagenes>
    {Loged()?
    <TutorialComp UserName={NombreUsuario} ></TutorialComp>:<></>
  }
  <div className={'container-fluid '+MainTheme}>
<Router>
  {Loged()?
<NavBar setTheme={setMainTheme} UserDN={UserDN} CerrarVisorFotos={CerrarFoto} LoadInicio={setInicioLoad} Mostrar={Mostrar} Ver={setMostrar} UserName={NombreUsuario}></NavBar>:
<></>
  }
{!Loged() ? <Redirect to='/Login'/>:<></>}

<Switch>
  <Route path="/Login">
  <Login BusquedaValores={BusquedaValores} setTheme={setMainTheme}  GenerarId={GenerarId} Ver={setMostrar}></Login>
  </Route>

  <Route path="/" exact>
    <Inicio UserDN={UserDN} GenerarId={GenerarId} Load={InicioLoad} setLoad={setInicioLoad}
      AbrirFoto={AbrirFoto} UserName={NombreUsuario}></Inicio>
  </Route>

  <Route path="/Perfil/:User">
    <Perfil GenerarId={GenerarId} Load={LoadPerfil} setLoad={setLoadPerfil} UserName={NombreUsuario}  AbrirFoto={AbrirFoto} 
    setFotoVisor={setFotoVisor} UserDN={UserDN} setFotoVisorDisplay={setFotoVisorDisplay}
     ></Perfil>
  </Route>

  <Route path="/Chat">
  <Chat GenerarId={GenerarId} UserName={NombreUsuario} UserDN={UserDN}></Chat>
  </Route>

  <Route path='/Post/:PostId'>
    <Post GenerarId={GenerarId} UserDN={UserDN} UserName={NombreUsuario} AbrirFoto={AbrirFoto} ></Post>
  </Route>

  <Route path='/Configuracion'>
    <Configuracion UserName={NombreUsuario}></Configuracion>
  </Route>

</Switch>

</Router>
</div>

</>
  );
}

export default App;
