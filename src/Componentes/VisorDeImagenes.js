import React from 'react';
import '../Css/VisorDeImagenes.css'

const VisorDeImagenes=(props)=>{


return(
    <>
       <div className={'DivVI col-12 '+props.Display}>
           <button className='btn btn-danger position-absolute CerrarVisor' onClick={props.Cerrar}>Cerrar</button>
           <img alt='VerFoto'  src={props.SRC} className='VI '></img>
        </div>
    </>
);
}

export default VisorDeImagenes;