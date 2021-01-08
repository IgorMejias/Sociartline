import React,{useEffect, useState} from 'react';
import { db } from '../Conectar';
import firebase from 'firebase/app';
import '../Css/Shares.css';

const Shares=(props)=>{
    const [ShareFormDP,setShareFormDP]=useState('d-none'); 
    const [TextoShare,setTextoShare]=useState('');
    const [VecesComp,setVecesComp]=useState(0);

    useEffect(()=>{
        let Mounted=true
       let Consulta= db.collection('Shares').doc(props.Id).onSnapshot((item)=>{
      if(Mounted && item.data()!==undefined){
        setVecesComp(item.data().Shares.length)
      }else{
        Consulta();
      }
        })

        return ()=>Mounted=false;
        },[props])

const MostrarSharer=()=>{

switch(ShareFormDP){
    case 'd-none':
    setShareFormDP('d-block')
    break;
    case 'd-block':
    setShareFormDP('d-none')
    break;
    default:
    break;
}
}

const AsignarShare=(e)=>{
const {value}=e.target;
setTextoShare(value)
}

const Compartir=()=>{
if(props.UserDN!==undefined){

    var PostShared='';
    var PostSharedUser='';

    if(props.Accion==='Compartida'){
        PostShared=props.Item.PostShared;
        PostSharedUser=props.Item.PostSharedUser;
    }
    else{
        PostShared=props.Id;
        PostSharedUser=props.Item.Usuario;  
    }
    var  MainId=props.GenerarId()
db.collection('Posts').doc(MainId).set({
    Usuario:props.UserName(),
    Texto:TextoShare,
    Creado:firebase.firestore.FieldValue.serverTimestamp(),
    Id:MainId,
   DisplayName:props.UserDN(),
   PostShared:PostShared,
   PostSharedUser:PostSharedUser
})

db.collection('Likes').doc(MainId).set({
    Likes:[]
})
db.collection('Shares').doc(MainId).set({
    Shares:[]
}).then(()=>{
db.collection('Posts').doc(MainId).get().then((item)=>{
    if(props.AggEstado!==undefined){
props.AggEstado([item.data(),...props.Estados])
let forCache=props.Estados;
forCache.unshift(item.data())
if(props.Location==='Perfil'){
    sessionStorage.setItem(props.UserPerfil,JSON.stringify(forCache))
}else{
sessionStorage.setItem('CacheInicio',JSON.stringify(forCache))
}
}

db.collection('Shares').doc(props.Id)
.update('Shares',firebase.firestore.FieldValue.arrayUnion(props.UserName()))

db.collection('Shares').doc(PostShared)
.update('Shares',firebase.firestore.FieldValue.arrayUnion(props.UserName()))

if(props.Item.Usuario!==props.UserName()){
    let Id=props.GenerarId();
    db.collection('Notificaciones').doc(props.Item.Usuario).collection('Notificaciones').doc(Id)
    .set({
        Id:Id,
        Texto:props.UserName()+' ha compartido tu publicación',
        Estado:'Sin ver',
        Usuario:props.UserName(),
        Accion:'Compartir',
        Hace:firebase.firestore.FieldValue.serverTimestamp(),
        PostId:MainId
        
    })
}
})
})

MostrarSharer();
}else{
    props.Reload();
}
}




    return (
    <>
    <form onSubmit={(e)=>{e.preventDefault(); Compartir();}} className={ShareFormDP}>
        <b>Compartir esta publicación</b>
        <textarea className='TextAreaShare d-block' onChange={AsignarShare} placeholder='Escribe un post' id={'TextoShare'+props.Id}></textarea>
        <input className='ShareButtons Compartir' type='submit' value='Compartir'></input>
        <button className='ShareButtons CerrarShare' onClick={(e)=>{e.preventDefault(); MostrarSharer();}}>Cerrar</button>
    </form>
    <button onClick={MostrarSharer} className="Stats Share "></button>
    <p className='d-inline'><b>{VecesComp+' '}</b>Veces compartido</p>
    </>
    );
}


export default Shares;