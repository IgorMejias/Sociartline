import React,{useState,useEffect} from 'react';
import { db } from '../Conectar';
import PerfilPicEstado from './PerfilPicEstado';
import TextoEstado from './TextoEstado';
import '../Css/PostShared.css';

const PostShared=(props)=>{

const [ItemPost,setItemPost]=useState({
    Usuario:''
});

useEffect(()=>{
    let Mounted=true;
db.collection('Posts').doc(props.Item).get().then((item)=>{
    if(Mounted && item.data()!==undefined){
setItemPost(item.data())
    }
})

return ()=>Mounted=false;
},[props])
  
return(
    
<div className='MainPostShared'>
    {ItemPost.Usuario!==''?
<>
<PerfilPicEstado UserName={ItemPost.Usuario}></PerfilPicEstado>
<TextoEstado Id={props.Item}></TextoEstado>
<img className='FotoEstado' onClick={props.AbrirFoto} alt={ItemPost.Archivo} src={ItemPost.Archivo}></img>
</>
:<p>Esta publicación ya no está disponible</p>
}
</div>
)

}

export default PostShared;