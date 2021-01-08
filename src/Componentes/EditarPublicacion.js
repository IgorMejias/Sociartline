import React,{useState} from 'react';
import '../Css/EditarPost.css';
import {db} from '../Conectar';

const EditarPublicacion=(props)=>{

const [NewText,setNewText]=useState('')

const GuardarCambios=()=>{
db.collection('Posts').doc(props.Id).update({
    Texto:NewText
});
Cerrar();
props.CerrarOpciones('d-block')
document.getElementById('TextAreaPost'+props.Id).value=''
}

const Cerrar=()=>{
props.setDisplay('d-none')
}

const Asignar=(e)=>{
let {value}=e.target;
setNewText(value);
}


return(
<>
<div className={'EditarPost '+props.Display}>
<button className='col-6 col-md-2 d-block container btn btn-danger' onClick={Cerrar}>Cerrar</button>
           <form onSubmit={(e)=>{ e.preventDefault(); GuardarCambios()}} className='FormPost col-12 container col-md-6 text-center'>
            <textarea id={"TextAreaPost"+props.Id} name='Texto' onChange={Asignar} type='text' className='form-control d-inline col-10 TextAreaPost' placeholder={props.Texto}></textarea>
            <input type='submit' className='btn btn-dark col-10'value='Guardar cambios'></input>

           </form>
        
</div>
</>

);
}


export default EditarPublicacion;