import React,{useState,useEffect} from 'react';
import { db } from '../Conectar';

const TextoEstado=(props)=>{

const [Texto,setTexto]=useState()

const DetectLink=(link,index)=>{
    if(/https:\/\//.test(link) || /http:\/\//.test(link)  ){
       let Original=link;
       let Modificar=Original.split(' ',Original.length)
       let html=[];
       Modificar.forEach((item,index)=>{
           if(/https:\/\//.test(item) || /http:\/\//.test(item) || /\.com/.test(item)){
       html.push(<a key={item+index} href={item}>{item+' '}</a>)
             }
             else{
        html.push(item+' ')
             }
    
       })
        return <p className='TextoEstado'>{html}</p>;
    }
    else{
    return <p className='TextoEstado'>{link}</p>
    }
    }


useEffect(()=>{
    let Mounted=true;
let Consulta=db.collection('Posts').doc(props.Id).onSnapshot((item)=>{
    if(item.data()!==undefined){
    if(Mounted){
setTexto(item.data().Texto)
    }else{
        Consulta();
    }
    }
})
return ()=>Mounted=false;
},[props])

    return(
        <>
    {DetectLink(Texto)}
    </>
    );
}

export default TextoEstado;