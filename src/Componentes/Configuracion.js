import React,{useEffect,useState} from 'react';
import { db } from '../Conectar';
import '../Css/Configuracion.css';

const Configuracion=(props)=>{

const [DatosConf,setDatosConf]=useState({
    Nombre:'',
    SobreMi:'',
    Estado:''
});

const [NuevaConf,setNuevaConf]=useState({
    Nombre:'',
    SobreMi:'',
    Estado:''
})


useEffect(()=>{

    let Mounted=true;
let Consulta=db.collection('Usuarios').doc(props.UserName()).onSnapshot((item)=>{
if(Mounted){
setDatosConf({...DatosConf,Nombre:item.data().DisplayName,
                            SobreMi:item.data().SobreMi,
                            Estado:item.data().Estado
                        })
}else{
    Consulta();
}
})

return ()=>Mounted=false;
},[props,DatosConf])


const AsignarConf=(e)=>{
const {value,name}=e.target;
setNuevaConf({...NuevaConf,[name]:value})
}

const GuardarConfig=(Accion)=>{
switch (Accion) {
    case 'Nombre':
        db.collection('Usuarios').doc(props.UserName()).update({
            DisplayName:NuevaConf.Nombre
        }).then(()=>{
            localStorage.setItem('DisplayName',NuevaConf.Nombre)
        })
    break;
    case 'SobreMi':
        db.collection('Usuarios').doc(props.UserName()).update({
            SobreMi:NuevaConf.SobreMi
        })
    break;
    case 'Estado':
        db.collection('Usuarios').doc(props.UserName()).update({
            Estado:NuevaConf.Estado
        })
    break;
    default:
        break;
}
}

    return(

        <div className='MainConfiguracion row'>
            <div className='col-12 col-md-10 container text-center text-md-left'>
        <form className='FormConfig' onSubmit={(e)=>{e.preventDefault(); GuardarConfig('Nombre')}}>
        <label className='LabelConfig d-block'><b>Nombre:</b> {DatosConf.Nombre}</label>
        <p>Este nombre es el que tus amigos podrán ver, el nombre de tu cuenta seguirá siendo el mismo</p>
        <input required={true} name='Nombre' onChange={AsignarConf} className='TextConfig' type='text' placeholder='Escribir un nuevo nombre'></input>
        <input className='SaveConfig' type='submit' value='Guardar'></input>
        </form>

        <form className='FormConfig' onSubmit={(e)=>{e.preventDefault(); GuardarConfig('SobreMi')}}>
        <label className='LabelConfig d-block'><b>Sobre mi: </b>{DatosConf.SobreMi}</label>
        <textarea required={true} name='SobreMi' onChange={AsignarConf} className='TextAreaConfig' placeholder='Describe tu perfil'></textarea>
        <input className='SaveConfig' type='submit' value='Guardar'></input>
        </form>

        <form className='FormConfig' onSubmit={(e)=>{e.preventDefault(); GuardarConfig('Estado')}}>
        <label className='LabelConfig d-block'><b>Estado:</b> {DatosConf.Estado}</label>
        <input required={true} name='Estado' onChange={AsignarConf} className='TextConfig' type='text' placeholder='Escribe un estado'></input>
        <input className='SaveConfig' type='submit' value='Guardar'></input>
        </form>
        </div>
        </div>
    )
}


export default Configuracion