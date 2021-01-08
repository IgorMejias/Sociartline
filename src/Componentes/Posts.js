import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { db } from '../Conectar';
import Estados from './Estados'
import '../Css/Posts.css';

const Post=(props)=>{

    const PostId=useParams().PostId;
    const [Publicacion,setPublicacion]=useState([]);
    const [DisplayNameAutor,setDisplayNameAutor]=useState('')
    const [Existe,setExiste]=useState(false)

useEffect(()=>{
 let Mounted=true;

db.collection('Posts').doc(PostId).get().then((item)=>{
    if(Mounted){
    let Collector=[]
Collector.push(item.data())
setPublicacion(Collector)
if(item.data()!==undefined){
    setDisplayNameAutor('Publicación de '+item.data().DisplayName)
    setExiste(true)
}else{
    setDisplayNameAutor('Publicación inexistente')
}
    }

})

return ()=>Mounted=false;
},[PostId])

const ReloadPost=()=>{
return false;
}

    return (

        <div className='row MainPosts'>
            <div className='col-12 col-md-7 container'>
            <h3 className={Existe?'col-12 TituloPost':'col-12 TituloError'}>{DisplayNameAutor}</h3>
         <Estados UserDN={props.UserDN} GenerarId={props.GenerarId} UserName={props.UserName} Reload={ReloadPost} Item={Publicacion} AbrirFoto={props.AbrirFoto}></Estados>
         </div>


        </div>
    );
}


export default Post;