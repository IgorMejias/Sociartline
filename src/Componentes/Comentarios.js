import React,{useEffect,useState} from 'react';
import { db } from '../Conectar';
import '../Css/Comentarios.css';
import OpcionesComentarios from './OpcionesComentarios';
import PerfilPicEstado from './PerfilPicEstado'

const Comentarios=(props)=>{

const [MainComents,setMainComents]=useState([])
const [TextoEditarCM,setTextoEditarCM]=useState('');
const [EditarCMDP,setEditarCMDP]=useState('d-none')

useEffect(()=>{

    let Mounted=true;
let Consulta=db.collection('Posts').doc(props.Id).collection('Comentarios').orderBy('Fecha','asc').onSnapshot((item)=>{
    let Collector=[]
item.forEach((doc)=>{
   
Collector.push(doc.data())
})
if(Mounted){
setMainComents(Collector)
}
else{
Consulta();
}
})

return ()=>Mounted=false;
},[props])


const AsignarCM=(e)=>{
setTextoEditarCM(e.target.value)
}

const ConfirmarEdit=(Post,Coment)=>{
db.collection('Posts').doc(Post).collection('Comentarios').doc(Coment).update({
    Texto:TextoEditarCM
})
setEditarCMDP('d-none')
}

    return(
        <>
        { 
        <div className={"DivComentarios col-12 mt-3 py-1 "+props.Display}>
         {MainComents.map((item,index)=>{
             return(
             <div key={index} className="Comentario">
                 {item.Usuario===props.UserName() || props.Autor===props.UserName() ?<OpcionesComentarios UserName={props.UserName} Usuario={item.Usuario} setEditar={setEditarCMDP} MainId={props.Id} Id={item.Id}></OpcionesComentarios>:<></>}
                <PerfilPicEstado UserName={item.Usuario}></PerfilPicEstado>
             <p>{item.Texto}</p>
    
             {item.Usuario===props.UserName() || props.Autor===props.UserName() ?
             <div className={EditarCMDP}>
                 <input type='text' onChange={AsignarCM} placeholder='Editar comentario'></input> 
                 <button onClick={()=>ConfirmarEdit(props.Id,item.Id)}>Confirmar</button>
            </div>:<></>}
             </div>
             );
         })}
        </div>
        }
        </>
    )
}

export default Comentarios;