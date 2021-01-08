import React,{useState,useEffect} from 'react';
import '../Css/Perfil.css';
import LeftBarPerfil from './LeftBarPerfil';
import {useParams} from 'react-router-dom';
import {db} from '../Conectar'
import Estados from './Estados';

const Perfil=(props)=>{

    const [PerfilPosts,setPerfilPosts]=useState([])

    var UserPerfil=useParams().User;

    useEffect(()=>{
        let Mounted=true;
        const InfoPerfil=async(Accion)=>{
        db.collection('Posts').where('Usuario','==',UserPerfil).orderBy('Creado','desc').get().then((data)=>{
           var Collector=[]
            data.forEach((doc)=>{
                Collector.push(doc.data())
            })
            if(Mounted){
            setPerfilPosts(Collector)
            }
            sessionStorage.setItem(UserPerfil,JSON.stringify(Collector))
            props.setLoad(true)
        })

    }
        if(props.Load){
        if(!sessionStorage.getItem(UserPerfil)){
        InfoPerfil();
         }
         else{
        let CacheData=sessionStorage.getItem(UserPerfil)
        setPerfilPosts(JSON.parse(CacheData))
         }
        }
        else{
        InfoPerfil();
        }

        return ()=>Mounted=false;

        },[props,UserPerfil])

        const ReloadEstadosPerfil=async(Accion)=>{
        db.collection('Posts').where('Usuario','==',UserPerfil).orderBy('Creado','desc').get().then((data)=>{
           var Collector=[]
            data.forEach((doc)=>{
                Collector.push(doc.data())
            })
            setTimeout(()=>{
            setPerfilPosts(Collector)
            sessionStorage.setItem(UserPerfil,JSON.stringify(Collector))
            props.setLoad(true)
        },200)
        })

    }


    return(
 
     <div className={PerfilPosts.length<1?"row ":"row MainPerfil"}>

     <LeftBarPerfil GenerarId={props.GenerarId}  UserName={props.UserName} AbrirFoto={props.AbrirFoto} setFotoVisorDisplay={props.setFotoVisorDisplay} setFotoVisor={props.setFotoVisor}></LeftBarPerfil>
    
     <div className="col-12 col-lg-8 container">
    <b>{PerfilPosts.length===0 && UserPerfil===props.UserName()?'Aquí se mostrarán tus publicaciones o las que compartas':''}</b>
     <Estados Location={'Perfil'} UserPefil={UserPerfil} AggEstado={setPerfilPosts} UserDN={props.UserDN} GenerarId={props.GenerarId}  
     UserName={props.UserName} Reload={ReloadEstadosPerfil}
      AbrirFoto={props.AbrirFoto} Item={PerfilPosts} >
      </Estados>
     </div>
     </div>
    
    );
}

export default Perfil;