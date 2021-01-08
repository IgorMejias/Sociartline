import React,{useState,useEffect}  from 'react';
import CrearPost from './CrearPost';
import Estados from './Estados';
import '../Css/Inicio.css';
import {db} from '../Conectar';
import Notificaciones from './Notificaciones';
import Busquedas from './Busquedas';


const Inicio=(props)=>{

    const [Posts,setPosts]=useState([]);
    const [MenuPost,setMenuPost]=useState('d-none');
    const [CrearBoton,setCrearBoton]=useState('')
    const [NotCont,setNotCont]=useState(0);
    const [NotDP,setNotDP]=useState('d-none')
    const [BusquedaDP,setBusquedaDP]=useState('d-none');

    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.location.pathname==='/'){
            sessionStorage.setItem('ScrollInicio',window.scrollY)
            }
        })

     document.title='Sociartline';
     let Mounted=true;

    const ObtenerPost=(Accion)=>{
        switch(Accion){
            case 'false':
   db.collection('Posts').orderBy('Creado','desc').get().then(async(data)=>{
    var Collector=[]
    Collector=[]
    data.forEach(async(doc)=>{
           Collector.push(doc.data())
      })
      if(Mounted){
      setPosts(Collector);
      sessionStorage.setItem('CacheInicio',JSON.stringify(Collector))
      sessionStorage.setItem('LoadInicio',true);

      }
   
   
    })
    break;

    case 'true':
    let CacheItem=sessionStorage.getItem('CacheInicio');
    if(Mounted){
    setPosts(JSON.parse(CacheItem))
    setTimeout(()=>{
        window.scrollTo(0,parseInt(sessionStorage.getItem('ScrollInicio')))
    },100)
 
    }
    break;

    default:
ObtenerPost('false')
    break;

}
}

    if(Mounted){
        ObtenerPost(sessionStorage.getItem('LoadInicio'));
    }


    return()=>Mounted=false;
},[props])


const ReloadInicio=(Accion)=>{
db.collection('Posts').orderBy('Creado','desc').get().then(async(data)=>{

var Collector=[]
Collector=[]
data.forEach(async(doc)=>{
       Collector.push(doc.data())
  })
  setPosts([])
    setPosts(Collector);
  sessionStorage.setItem('CacheInicio',JSON.stringify(Collector))
  sessionStorage.setItem('LoadInicio',true);
})

}

  

    const Crear=()=>{
        window.scrollTo(0,0);
        setMenuPost('d-block')
        setCrearBoton('d-none')
    }


    return(
        <div className='MainInicio row'>
        <div className='DivBotones'>
        <button title="Crear post" className={CrearBoton+' BotonesAcciones CrearPostBoton'} onClick={Crear}></button>
        <button className='BotonesAcciones BotonNotificaciones' onClick={()=>{setNotDP('d-block')}} title='Notificaciones'><b className='NotCont'>{NotCont>0?NotCont:''}</b></button>
        <button title="Buscar" className='BotonesAcciones BotonBusqueda' onClick={()=>{setBusquedaDP('d-block')}} ></button>
        </div>
      <Notificaciones Display={NotDP} setDisplay={setNotDP} setNotCont={setNotCont} UserName={props.UserName}></Notificaciones>
      < Busquedas Display={BusquedaDP} setDisplay={setBusquedaDP}></Busquedas>
        <div className="col-12 col-md-7 container-fluid">
        <CrearPost UserDN={props.UserDN} GenerarId={props.GenerarId} Reload={ReloadInicio} Boton={setCrearBoton} Display={MenuPost} setDisplay={setMenuPost} UserName={props.UserName}></CrearPost>
        <Estados AggEstado={setPosts} UserDN={props.UserDN} GenerarId={props.GenerarId} UserName={props.UserName} Reload={ReloadInicio} Item={Posts} AbrirFoto={props.AbrirFoto}></Estados>
        </div>
        </div>
    );
}

export default Inicio;