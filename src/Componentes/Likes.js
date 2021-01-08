import React,{useState,useEffect} from 'react';
import { db } from '../Conectar';
import firebase from 'firebase/app';
import Shares from './Shares';

const Likes=(props)=>{

    const [Liked,setLiked]=useState(false)
    const [LikesCont,setLikesCont]=useState()

    useEffect(()=>{
        let Mounted=true;
       let Consulta= db.collection('Likes').doc(props.Id).onSnapshot((item)=>{
            if(item.data()!==undefined){
                if(Mounted){
            let Likes=item.data().Likes
            let Buscar=Likes.indexOf(props.UserName())
            if(Buscar<0){
                setLiked(false)
            }
            else{
                setLiked(true)
            }
            setLikesCont(Likes.length)
        }
        else{
            Consulta();
        }
    }
        })
        return ()=>Mounted=false;
    },[props])

    const Like=()=>{

        db.collection('Likes').doc(props.Id).get().then((item)=>{
            if(item.data()!==undefined){
            let Likes=item.data().Likes
            let Buscar=Likes.indexOf(props.UserName())
                if(Buscar<0){
                    db.collection('Likes').doc(props.Id).update('Likes',firebase.firestore.FieldValue.arrayUnion(props.UserName()))
                    .then(()=>{
                        if(props.Item.Usuario!==props.UserName()){
                            let Id=props.GenerarId()
                        db.collection('Notificaciones').doc(props.Item.Usuario).collection('Notificaciones').doc(Id).set({
                            Id:Id,
                            Texto:'A '+props.UserName()+' le ha gustado tu publicación',
                            Hace:firebase.firestore.FieldValue.serverTimestamp(),
                            Usuario:props.UserName(),
                            Estado:'Sin ver',
                            Accion:'Like',
                            PostId:props.Id
                        })

                    }
                    })
                }
                else{
                 db.collection('Likes').doc(props.Id).update('Likes',firebase.firestore.FieldValue.arrayRemove(props.UserName()))
                }   
            }else{
                props.Reload();
            }

        })
       }


    return(
        <div>
<div><img alt="Likes" height='20' width='20' src='https://firebasestorage.googleapis.com/v0/b/fire2lips.appspot.com/o/Usuarios%2FImagenes%2FLiked.png?alt=media&token=a27431d9-819f-45a4-9588-c042b8213af2'></img><b>{LikesCont}</b></div>
<button onClick={Like} className={ Liked ?'Liked Stats':'Unliked Stats'}></button>
<Shares UserPerfil={props.UserPerfil} Location={props.Location} Reload={props.Reload} Estados={props.Estados} AggEstado={props.AggEstado} Accion={props.Accion} UserDN={props.UserDN} GenerarId={props.GenerarId} UserName={props.UserName} Item={props.Item} Id={props.Id}></Shares>        
        </div>
    )
}

export default Likes;