import React,{useEffect,useState} from 'react';
import { db } from '../Conectar';
import '../Css/TutorialComp.css';

const TutorialComp=(props)=>{

    const [TutoDP,setTutoDP]=useState('d-none');
    const [TutoCont,setTutoCont]=useState(0);
    const Titulos=['¡Bienvenido!','Buscador','Amistades','Notificaciones','Chat','Contactos','Publicaciones','Perfil'];
    const Info=[
        'A continuación una breve explicación sobre como funciona Sociartline',
        'Usa el buscador para encontrar el perfil de otros usuarios, agrégalos para poder chatear con ellos',
        'Tu nombre en la barra de navegación mostrará si tienes solicitudes de amistad',
        'Este icono mostrará las interacciones de otros usuarios con tus publicaciones, haz click sobre él para observar la actividad',
        'En la sección \'Chat\' de la barra de navegación se mostrará si has recibido un mensaje, haz click sobre el para abrir el Chat',
        'Una vez que agregues personas podrás verlos en la parte superior del Chat',
        'Puedes postear estados y fotos, en ellos se puede reaccionar, comentar y compartir, click sobre este icono para crear una',
        'Tu perfil muestra tu información, cambia tu foto de perfil o modifica tu nombre, estado o descripción'
    ];

    const FotosTuto=['./Logo.png','./TutoFotos/Busqueda.png','./TutoFotos/Amistades1.jpg','./TutoFotos/Notificaciones.png','./TutoFotos/Chat.png','./TutoFotos/Contactos.png','./TutoFotos/CrearPost.png','./TutoFotos/Perfil.png']

useEffect(()=>{
    let First=true;
    if(First){
    db.collection('Usuarios').doc(props.UserName()).get().then((item)=>{
       if(item.data()){
        if(item.data().Tutorial==='Incomplete'){
        setTutoDP('d-block');
        }
        }
        })
    }

    return ()=>First=false;
},[props])

    const Siguiente=()=>{
setTutoCont(TutoCont+1)
    }

    const CerrarTuto=()=>{
setTutoDP('d-none');
db.collection('Usuarios').doc(props.UserName()).update({
Tutorial:'Complete'

    })
    }

    return(
<>

<div className={'MainTutorial '+TutoDP}>
    <div className='TutorialDiv'>
    <h3>{Titulos[TutoCont]}</h3>
    <p>{Info[TutoCont]}</p>
    <div className='DivFotoTuto'>
    <img className='FotoTuto' alt='TutoImg' src={FotosTuto[TutoCont]}></img>
    </div>
    {TutoCont<7?
    <button className='Siguiente' onClick={Siguiente}>Siguiente</button>:
    <button className='Finalizar' onClick={CerrarTuto}>Finalizar explicación</button>
    }
    </div>

</div>
</>
    );
}

export default TutorialComp;