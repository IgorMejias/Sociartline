import React,{useState,useEffect} from 'react';
import { db } from '../Conectar';
import '../Css/FotoContacto.css';

const FotoContacto=(props)=>{

    const [FotoCont,setFotoCont]=useState();
    const [MensajesSin,setMensajesSin]=useState();
    const [NombreCont,setNombreCont]=useState();
    const [DName,setDName]=useState();

    useEffect(()=>{
        let Mounted=true;
        if(Mounted){
        db.collection('Usuarios').doc(props.User).onSnapshot((item)=>{
            if(Mounted){
                setFotoCont(<img className="FotoContacto" alt="contact" src={item.data().Foto}></img>)
            setNombreCont(<b className='NombreContacto'>{item.data().DisplayName}</b>)
                setDName(item.data().DisplayName)
        }
            })


    const SinLeer=async()=>{
          db.collection('Mensajes').doc(props.Chat).collection('Mensajes').where('Estado','==','Sin leer').onSnapshot((item)=>{
            if(Mounted){
                let Cont=0;
              item.forEach((doc)=>{
                if(doc.data().Usuario!==props.UserName()){
                    Cont+=1;
                }
              })
              if(Cont>0){
                  if(Mounted){
              setMensajesSin(<b className='MensajesSin'>{Cont}</b>)
                  }
              }
              else{
                  if(Mounted){
                setMensajesSin(<></>)
                  }
            }
            }
          })
        
    }

    SinLeer();
}
    return ()=>Mounted=false;
    },[props])

    const MostrarNombre=()=>{
        props.setDisplayNameChat(DName)
    }

return(
<div className='DivContacto' onClick={MostrarNombre}>
    {FotoCont}
    {NombreCont}
    {MensajesSin}
</div>
);

}

export default FotoContacto;