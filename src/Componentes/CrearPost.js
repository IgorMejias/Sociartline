import React,{useState} from 'react';
import '../Css/CrearPost.css';
import { db,storage } from '../Conectar';
import firebase from 'firebase/app';

const CrearPost=(props)=>{
    
const UserName=props.UserName();
var TextArea=document.getElementById('TextAreaPost');

const [Datos,setDatos]=useState({
    Texto:'',
    Archivo:''
})

const [ProgresoPost,setProgresoPost]=useState();
const [ProgresoPostDisplay,setProgresoPostDisplay]=useState('d-none')

const Asignar=(e)=>{
const {name,value}=e.target
switch(name){
    case 'Texto':
 setDatos({...Datos,[name]:value})
 break;
    case 'Archivo':
        if(e.target.files[0]){
setDatos({...Datos,Archivo:e.target.files[0]})

        }
    break;
    default:
        break;
}
}

const Cerrar=()=>{
    props.setDisplay('d-none')
    props.Boton('d-inline')
    setProgresoPostDisplay('d-none')
}




const Publicar=async(e)=>{

    let Id=props.GenerarId();
if(Datos.Archivo){
    const SubirFile=storage.ref(`Usuarios/Imagenes/${Datos.Archivo.name}`).put(Datos.Archivo)
    SubirFile.on('state_changed',
    (snapshot)=>{
        let Progreso=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setProgresoPost(Progreso);
        setProgresoPostDisplay('d-block')
    },(error)=>{

    },(complete)=>{
        storage.ref('Usuarios/Imagenes/').child(Datos.Archivo.name).getDownloadURL().then(async(url)=>{
           await db.collection('Posts').doc(Id).set({
               Id:Id,
               Usuario:UserName,
               Texto:Datos.Texto,
               Archivo:url,
                Creado:firebase.firestore.FieldValue.serverTimestamp(),
                DisplayName:props.UserDN(),

            })
             db.collection('Likes').doc(Id).set({
                 Likes:[]
            })
            db.collection('Shares').doc(Id).set({
                Shares:[]
           })
            TextArea.value='';
            setDatos({...Datos,Archivo:''})
            props.Reload(false)
            Cerrar();
        })

    })

} if(TextArea.value!=='' && TextArea.value!==null && !Datos.Archivo){
db.collection('Posts').doc(Id).set({
    Usuario:UserName,
    Texto:Datos.Texto,
    Creado:firebase.firestore.FieldValue.serverTimestamp(),
    Id:Id,
   DisplayName:props.UserDN()
})

db.collection('Likes').doc(Id).set({
    Likes:[]
})
db.collection('Shares').doc(Id).set({
    Shares:[]
})
TextArea.value='';
props.Reload()
Cerrar();
}

}


return(
<>
<div className={'CrearPost '+props.Display}>
<button className='col-6 col-md-2 d-block mb-2 container btn btn-danger' onClick={Cerrar}>Cerrar</button>
           <form onSubmit={(e)=>{ e.preventDefault(); Publicar()}} className='FormPost col-12 container col-md-8 text-center'>
           <div className='DivArchivoPost'>
            <input accept='image/*' onChange={Asignar} name='Archivo' multiple type='file' className='d-block ArchivoPost'></input>
            </div>
            <textarea id="TextAreaPost" name='Texto' onChange={Asignar} type='text' className='form-control d-inline col-10 TextAreaPost' placeholder='Escribir un post'></textarea>
            <input type='submit' className='btn btn-dark col-10'value='Publicar'></input>
            <div className={'col-12 '+ProgresoPostDisplay}>
                <b className='col-12'>Subiendo archivo</b>
            <progress max='100' className='d-block container' value={ProgresoPost} ></progress>
            </div>
           </form>
        
</div>
</>

);
}


export default CrearPost;