import React from 'react'
import Login from './Login'

export default function AuthControler(props) {
    return (
        <div>
            {
                props.user.islogin ?
                <props.component user={props.user} updateUser={props.updateUser}  />
                :
                <Login user={props.user} setUser={props.setUser}  />                
            }
        </div>
    )
}
