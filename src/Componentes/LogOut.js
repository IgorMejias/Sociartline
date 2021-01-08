import React,{useEffect} from 'react';
import {withRouter} from 'react-router-dom';

const LogOut=(props)=>{

    useEffect(()=>{
        console.log('ok')
sessionStorage.setItem('Usuario','')
props.history.push('/Login')
},[props.history])

return(
    <></>
)

}

export default withRouter(LogOut)