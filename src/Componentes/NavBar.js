import React,{useEffect, useState} from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import 'firebase/auth';
import {useFirebaseApp} from 'reactfire';
import '../Css/NavBar.css'
import {useUser} from 'reactfire';
import { db } from '../Conectar';

const NavBar=(props)=>{
    let Loged=useUser();

const firebase=useFirebaseApp();
const [MensajesSinLeer,setMensajesSinLeer]=useState(0);
const [SolicitudesNav,setSolicitudesNav]=useState(0);
    useEffect(()=>{
        let Mounted=true;
  if(Loged){
      let Consulta=db.collection('Mensajes').where('ArrayUsers','array-contains',props.UserName()).onSnapshot((item)=>{
        let Cont=0;
        item.docs.forEach((doc)=>{
        if(doc.data().SinLeer===props.UserName()){
            Cont+=1;
        }
        })
        if(Mounted){
        setMensajesSinLeer(Cont)
        }else{
            Consulta();
        }
      })

      let ConsultaN=db.collection('Usuarios').doc(props.UserName()).onSnapshot((item)=>{
        if(Mounted){
            let ContSol=0;
            if(item.data()!==undefined){
        item.data().Solicitudes.forEach((doc)=>{
            if(doc.Estado==='Confirmar'){
                ContSol+=1;
            }
        })
    }
      setSolicitudesNav(ContSol)
    }else{
        ConsultaN();
    }
      })
  }

        switch(window.location.pathname){
            case '/Login':
                props.Ver('d-none')
                break;
            default:
                props.setTheme('MainBlack')
                break;
        }

        return ()=>Mounted=false;
    },[props,Loged])


    const Salir=async()=>{
        Focus.forEach((x)=>{
            x.style.textShadow='0 0 0';
            x.style.color='rgb(206, 204, 204)';
         })
        sessionStorage.setItem('Usuario','')
        sessionStorage.setItem('DisplayName','')
        sessionStorage.setItem('LoadInicio',false)
        sessionStorage.setItem('ActualChat','');
        await firebase.auth().signOut();
        props.setTheme('Main')
    }

   const Focus= document.querySelectorAll('#LinkNav');


    return(
        <div className={'MainNav row '+props.Mostrar}>
    <div className='container-fluid text-center text-md-left'>
    <NavLink activeClassName="SelectedNav" exact={true} to='/'  id='LinkNav' className=' d-inline-block Navegacion' >
    Estados
    </NavLink>
    <NavLink activeClassName="SelectedNav" exact={true} id='LinkNav' to={"/Perfil/"+props.UserName()} className='  d-inline-block  Navegacion'>
    {props.UserDN().substr(0,12)}{SolicitudesNav>0?<p className='d-inline '><b className='SolicitudesNavCont'> {SolicitudesNav}</b></p>:''}
    </NavLink>
    <NavLink activeClassName="SelectedNav" exact={true} to= '/Chat' id='LinkNav' className='Navegacion d-inline-block '>
   Chat{MensajesSinLeer>0?<p className='d-inline '><b className='MensajesCont'>{MensajesSinLeer}</b></p>:''}
    </NavLink>
    <button id='LinkNav' onClick={Salir} className=' LogOut  Navegacion'></button>
    </div>
    </div>
    );

}

export default withRouter(NavBar);