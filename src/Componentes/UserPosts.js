import React,{useState} from 'react';

const UserPosts=(props)=>{






return(
    <div className="col-8">
        {PerfilPosts.map((item,index)=>{
            return(
                <div key={index}>
                    <p>{item.Texto}</p>
                </div>
            )
        })}
    </div>
); 
    
}

export default UserPosts;