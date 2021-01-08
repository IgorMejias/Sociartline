import React,{useState} from 'react';
import { db } from '../Conectar';
import firebase from 'firebase/app'

const Comentar=(props)=>{

    const [ComentarioCrear,setComentario]=useState({
        Texto:'',
        Archivo:''
    })


    const Comentar=()=>{
        if(/\S/.test(ComentarioCrear.Texto)){
        let Id=props.GenerarId();
         document.getElementById('TextComentar'+props.Id).value='';
        db.collection('Posts').doc(props.Id).collection('Comentarios').doc(Id).set({
            Fecha:firebase.firestore.FieldValue.serverTimestamp(),
            Id:Id,
            Usuario:props.UserName(),
            Texto:ComentarioCrear.Texto
        }).then(()=>{
            if(props.User!==props.UserName()){
                let Id=props.GenerarId()
            db.collection('Notificaciones').doc(props.User).collection('Notificaciones').doc(Id).set({
                Id:Id,
                Texto:props.UserName()+' ha comentado tu publicación',
                Hace:firebase.firestore.FieldValue.serverTimestamp(),
                Usuario:props.UserName(),
                Estado:'Sin ver',
                Accion:'Comentario',
                PostId:props.Id
            })
        }
        })
       props.DisplayComents('d-block')
       props.setTexto('Ocultar comentarios')
        }
    }

    const ComentarConEnter=(e)=>{
        if(e.keyCode===13 && !e.shiftKey && window.innerWidth>768){
            e.preventDefault();
            Comentar();
        }
    }
    
        
        
        const AsignarComentario=(e)=>{
            let {value,name}=e.target
            setComentario({...ComentarioCrear,[name]:value})
        }

    return(
        <div className="col-12">
<form onSubmit={(e)=>{e.preventDefault(); Comentar()}}>
<textarea onKeyDown={ComentarConEnter} id={"TextComentar"+props.Id} name='Texto' className="d-block Comentar col-12" onChange={AsignarComentario} placeholder="Escribir comentario"></textarea>
<input type="submit" className="btn btn-primary col-12" value="Comentar"></input>
</form>
</div>
    )
}

export default Comentar;