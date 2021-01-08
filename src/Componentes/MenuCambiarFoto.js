import React,{useState} from 'react';
import '../Css/MenuCambiarFoto.css';
import {storage,db} from '../Conectar'


const MenuCambiarFoto=(props)=>{


const [VistaPrevia,setVistaPrevia]=useState();
const [Confirmar,setConfirmar]=useState('d-none');
const [ImgDisplay,setImgDisplay]=useState('d-none')
const [Progreso,setProgreso]=useState();
const [ProgresoDisplay,setProgresoDisplay]=useState('d-none');

const Cerrar=()=>{
    props.setMenuFotoDisplay('d-none')
    setVistaPrevia('')
    setConfirmar('d-none')
    setImgDisplay('d-none')
}

const CambiarFotoDePerfil=(e)=>{

if(e.target.files[0]){
    setImgDisplay('d-block')
    setProgresoDisplay('d-inline')
    setConfirmar('d-none')
   const Datos=e.target.files[0];
    const Envio=storage.ref(`Usuarios/Imagenes/${Datos.name}`).put(Datos);
    Envio.on('state_changed',
    (snapshot)=>{
       setProgreso((snapshot.bytesTransferred/snapshot.totalBytes)*100)
    },
    (error)=>{
        alert(error)
    },
    (complete)=>{
        storage.ref('Usuarios/Imagenes').child(Datos.name).getDownloadURL().then(async(url)=>{
         await setVistaPrevia(url)
         setConfirmar('d-inline')
         setProgresoDisplay('d-none')
         
        })
       
    })
}
}

const Actualizar=async()=>{
    props.setCargandoFoto('visible')
   const Update= await db.collection('Usuarios').doc(props.Usuario)
  await Update.update({
       Foto:VistaPrevia
   })
   setVistaPrevia('');
   setConfirmar('d-none')
   Cerrar();
   props.setCargandoFoto('invisible')

}




return(
<>
<div className={' MenuCambiarFoto '+props.MenuFotoDisplay}>
<button className='btn btn-dark container' onClick={Cerrar}>Cerrar</button>
<h4 className='text-center text-info'>Elige una foto</h4>
<input className='form-control col-6' accept='image/*' onChange={CambiarFotoDePerfil} type='file'></input>
<img alt='Generando vista previa' className={'FotoDePerfil '+ImgDisplay} src={VistaPrevia}></img>
<button className={'btn btn-dark container '+Confirmar} onClick={Actualizar}>Confirmar</button>
<progress className={ProgresoDisplay} value={Progreso} max='100'></progress>
</div>

</>
);

}

export default MenuCambiarFoto;