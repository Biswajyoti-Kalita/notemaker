import React from 'react';
import { useHistory } from 'react-router';
import loading from '../images/loading.gif';


export default function Loading(props) {


    let history = useHistory();
    setTimeout(() => {
        if(props.user === null)
            history.push('/createpassword');
        else
            if(props.user.islogin === true)
                history.push('/dashboard');
            else
                history.push('/login');
    
    }, 1000);

    return (
        <div style={{height:"100vh"}}>
            <center>
                <img alt="loading" src={loading} style={{marginTop:"50%"}} width="80" />
            </center>
        </div>
    )
}
