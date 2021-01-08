import React,{useState} from 'react';
import { db } from '../Conectar';
import '../Css/Busquedas.css';
import {Link} from 'react-router-dom';

const Busquedas=(props)=>{

    const [TextoBusqueda,setTextoBusqueda]=useState('');
    const [ResultadosDeBusqueda,setResultadosDeBusqueda]=useState([]);
    const [Buscando,setBuscando]=useState('d-none');
    const [ResultEst,setResultEst]=useState('');
    

    const Buscar=()=>{
        setBuscando('d-block');
        setResultEst('')
        db.collection('Usuarios').where('Busqueda','array-contains',TextoBusqueda).get().then((item)=>{
            let Collector=[]
            item.forEach((doc)=>{
                Collector.push(doc.data())
            })
            if(window.location.pathname==='/'){
            setResultadosDeBusqueda(Collector)
            if(Collector.length===0){
                setResultEst('No se encontraron resultados para su búsqueda')
            }else{
                setResultEst('')
            }
            }
        }).then(()=>{
            if(window.location.pathname==='/'){
            setBuscando('d-none');
            }
        })
    }

    const AsignarBusqueda=(e)=>{
        const {value}=e.target;
        setTextoBusqueda(value)
    }

    return (

        <div className={'MainBusqueda '+props.Display}>
            <button className='CerrarBusqueda' onClick={()=>{props.setDisplay('d-none')}}>Cerrar</button>
            <form onSubmit={(e)=>{e.preventDefault(); Buscar()}}>
            <input type='text' className='TextoBuscar' onChange={AsignarBusqueda} placeholder='Buscar' ></input>
            <input className='SubmitBuscar' type='submit' value=''></input>

            </form>
        <div className='DivResultados'>
            <div className={'DivCargaBusqueda '+Buscando}><div className='CilindroBusqueda'></div></div>
    <p>{ResultEst}</p>
        {ResultadosDeBusqueda.map((item,index)=>{
           return( 

            <div className='ResultadoDiv' key={index}>
                <Link to={'/Perfil/'+item.Nombre}>
                <img alt='resultpic' src={item.Foto} className='FotoResultado'></img>
               <b>{item.DisplayName}</b>
               </Link>
            </div>

           );
        })}
        </div>
        </div>
    )
}

export default Busquedas;