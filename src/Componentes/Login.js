import React,{useState} from 'react';
import '../Css/Login.css';
import Registro from './Registro';
import LoginHeader from './LoginHeader';

const Login=(props)=>{


const [Mostrar,setMostrar]=useState('d-none d-md-block')
const [BotonMostrar,setBotonMostrar]=useState('btn btn-light')

document.title='Iniciar sesión';

const MostrarOcultarRegistro=()=>{
switch(Mostrar){
    case 'd-none d-md-block':
    setMostrar('d-block')
    setBotonMostrar('btn btn-dark')
    break;

    case 'd-block':
    setMostrar('d-none d-md-block')
    setBotonMostrar('btn btn-light')
    break;

    default:
}
}



    return(
        <>
     <LoginHeader setTheme={props.setTheme} UserName={props.UserName} Funcion={MostrarOcultarRegistro} Ver={props.Ver} BotonMostrar={BotonMostrar}></LoginHeader>

        <div className='row RegistroRow'>
        <Registro BusquedaValores={props.BusquedaValores} GenerarId={props.GenerarId} Mostrar={Mostrar}></Registro>
       
        <div className='col-md-3 col-lg-4 col-xl-6 DivLogo text-center mb-md-5'>
        <h2 className='col-10 Saludo'>Te damos la bienvenida</h2>
            <img className='col-12 col-xl-6 mt-2 pt-4 LogoCentral' src='./Logo.png' alt='Bienvenido'></img>
            </div>

        <div className='col-md-4 col-lg-4 col-xl-3 mt-2 Info '>
            <h4>Crecimiento</h4>
            <p className='TextoInfo'>
                ¡Ya somos más de 10 usuarios! ¿Que esperas?
            </p>
            <p>Notas de la versión</p>
            <ul>
                <li className='TextoInfo mb-1'>Chat disponible</li>
                <li className='TextoInfo mb-1'>Se agregó la funcionalidad de estados</li>
            </ul>
            <p className='text-right'>Versión 1.0</p>
        </div>
        </div>

        <aside className='row bg-light mt-4 mb-5'>
        <h4 className='container text-center'>¿Que es Socialartline?</h4>
        <article className='col-12'>
        <p>
        Socialartline es una red social donde podrás compartir tus proyectos personales y así mismo interactuar con otros en la realización de sus proyectos, si eres programador, artista o comerciante Sociartline tiene mucho que ofrecerte, ¡Unete!
        </p>

        </article>
        </aside>

        <footer className='Footer text-white row'>
           <p className='text-center container'>Socialartline Igor Mejias @2020 todos los derechos reservados</p>
        </footer>
        </>
    );
}

export default Login;