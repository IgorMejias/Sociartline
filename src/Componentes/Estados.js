import React from 'react';
import '../Css/Estados.css';
import OpcionesEstado from './OpcionesEstado';
import StatsEstados from './StatsEstados';
import Likes from './Likes';
import PerfilPicEstado from './PerfilPicEstado';
import TextoEstado from './TextoEstado';
import PostShared from './PostShared';
import Autor from './Autor';


const Estados=(props)=>{ 



    return(
        <>
           <div className=' EstadosDiv col-12'>
           {props.Item.map((item,index)=>{
                return(
                 <div key={index}>{item!==undefined?
                    <div  className='mb-2'>
                <div id={item.Id}  className='container-fluid DivEstado'>
                
                <div className='DivEstadoTop'>
               {item.Usuario===props.UserName() ?<OpcionesEstado Texto={item.Texto} Reload={props.Reload} Item={props.Item} Id={item.Id}></OpcionesEstado>:<></>}
               <PerfilPicEstado  UserName={item.Usuario}></PerfilPicEstado>
               {item.PostShared?<Autor Name={item.PostSharedUser}></Autor>:' publicó un estado'}
           
              </div>
             <TextoEstado Id={item.Id}></TextoEstado>
             
               {item.PostShared?<PostShared AbrirFoto={props.AbrirFoto} Item={item.PostShared}></PostShared>:<></>}
                {item.Archivo ?  <img className='FotoEstado' onClick={props.AbrirFoto} alt={item.Archivo} src={item.Archivo}></img> : <></> }
                <Likes UserPerfil={props.UserPerfil} Location={props.Location} Reload={props.Reload} Estados={props.Item} AggEstado={props.AggEstado} Accion={item.PostShared?'Compartida':'Publicada'} UserDN={props.UserDN} GenerarId={props.GenerarId} Item={item} UserName={props.UserName} Id={item.Id}></Likes>
                </div>
                <StatsEstados Autor={item.Usuario} GenerarId={props.GenerarId} Id={item.Id} UserName={props.UserName}></StatsEstados>
                </div>
           :<>
           <div className=' ErrorEstado'>
           <b className='d-block'>Esta publicación ya no está disponible</b>
           <p>generalmente de debe a que la publicación ha sido eliminada</p>
           </div>
           
           </>}
                 </div>
                );
            })}
           </div>
         
        </>
    );
}

export default Estados;