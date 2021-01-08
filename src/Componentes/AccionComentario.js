import React,{useEffect,useState} from 'react';


const AccionComentario=(props)=>{

    const [Source,setSource]=useState();

    useEffect(()=>{
        switch(props.Accion){
            case 'Comentario':
                setSource('Accion AccionComentario');
            break;

            case 'Like':
                setSource('Accion AccionLike');
            break;

            case 'Compartir':
                setSource('Accion AccionCompartir');
            break;

            default:
            break;
        }
    },[props])

    return (
        <div className={Source}></div>
    );
}

export default AccionComentario;