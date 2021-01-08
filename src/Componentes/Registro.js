import React,{useState} from 'react';
import {useForm} from 'react-hook-form';
import 'firebase/auth';
import {useFirebaseApp} from 'reactfire';
import {db} from '../Conectar'

const Registro=(props)=>{

const firebase=useFirebaseApp();

const [Estado,setEstado]=useState()
const [CargaVis,setCargaVis]=useState('d-none')

const{register,errors,handleSubmit}=useForm();



const [Datos,setDatos]=useState({
    Usuario:'',
    Pass:'',
    RepPass:'',
    Correo:''
})

const Asignar=async(e)=>{
const {name,value}=e.target;
setDatos({...Datos,[name]:value})
}






const EnviarDatos=async(Data)=>{  

setEstado(<p className='col-9'>Verificando...</p>)
setCargaVis('d-block')
const VeriCorreo=await db.collection('Usuarios').doc(Data.Usuario).get()
if(VeriCorreo.exists){
    setEstado(<p className='text-danger col-9'>Nombre de usuario no disponible</p>)
    setCargaVis('d-none')  
}
else{
try{
const RegisCorreo=await firebase.auth().createUserWithEmailAndPassword(Data.Correo,Data.Pass)

await db.collection('Usuarios').doc(Data.Usuario).set({
    Nombre:Data.Usuario,
    Foto:'https://firebasestorage.googleapis.com/v0/b/fire2lips.appspot.com/o/default.jpg?alt=media&token=5df4093a-732a-41fb-a967-85a4caa5cdda',
    Estado:'Disponible',
    SobreMi:'Nuevo en Sociartline :\')',
    Solicitudes:[],
    DisplayName:Data.Usuario,
    Mail:Data.Correo.toLowerCase(),
    Busqueda:props.BusquedaValores(Data.Usuario),
    Tutorial:'Incomplete'
}).then(()=>{
    db.collection('Notificaciones').doc(Data.Usuario).set({ })
})

if(RegisCorreo){
firebase.auth().currentUser.updateProfile({displayName:Data.Usuario})
 setEstado(<p className='text-info col-9'>!Datos registrados!</p>)
}
}
catch(error){
    switch(error.code){
        case 'auth/email-already-in-use':
            setEstado(<p className='text-danger col-9'>El correo está en uso</p>)  
        break;

        default:
        break;
    }
}
}
setCargaVis('d-none')
}



return(
<>
<form className={'col-12 col-md-5 col-lg-4 col-xl-3 Registrarse '+props.Mostrar} onSubmit={handleSubmit(EnviarDatos)}>
        <h3 className='text-center'>Registrarse</h3>
        <input type='text' placeholder='Nombre de usuario' className='form-control col-11 text-center mb-1 container' onChange={Asignar} name="Usuario" autoComplete='off' 
        ref={register({
            required:{
                value: true, message:'Completa este campo'
            },
            minLength:{
                value:6,
                message:'Minimo 6 caracteres'
            }
        }      
        )}
        ></input>
        <p className='text-danger'>{errors?.Usuario?.message}</p>

        <input type='password' placeholder='Escribir contraseña' className='form-control col-11  text-center mb-1 container' onChange={Asignar} name='Pass'
           ref={register({
            required:{
                value: true, message:'Completa este campo'
            },
            minLength:{
                value:6,
                message:'Minimo 6 caracteres'
            }
        }      
        )}
        ></input>
        <p className='text-danger'>{errors?.Pass?.message}</p>
        <input type='password' placeholder='Repetir contraseña' className='form-control col-11  text-center mb-1 container' onChange={Asignar} name='RepPass'
               ref={register({
                required:{value:true,message:'Completa este campo'},
                validate:value =>value===Datos.Pass || "Las contraseñas no coinciden",
                   
            })
        }
        
        
        ></input>
        <p className='text-danger'>{errors?.RepPass?.message}</p>
        <input type='text' placeholder='Correo electronico' className='form-control col-11  text-center mb-1 container' onChange={Asignar} name='Correo'
                ref={register({
                    required:{value:true,message:'Completa este campo'},
                pattern:{value:/.*@.*\..{2}/, message:'Dirección de correo invalida'}
                })
            }
        
        ></input>
        <p className='text-danger'>{errors?.Correo?.message}</p>
        <input type='submit' value='Enviar datos' className='form-control col-6  mb-1 container'></input>
 <div className='row'>      
{Estado}<div className='ml-4 mt-2 DivCarga'><div className={'Cilindro '+CargaVis}></div></div>
</div> 
</form>

</>

);


}

export default Registro;