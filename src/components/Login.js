import React from 'react'
import { Form, Button , InputGroup, FormControl, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router';
import lockimg from '../images/lock.png'

export default function Login(props) {
    const history = useHistory();
    let divStyle = {
        padding: "10%",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100vh"
    };
    const [password, setPassword] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");


    let formSubmit = (e) =>{
        e.preventDefault();
        if(props.user.password === password){
            props.updateUser({
                islogin : true,
                password : password,
                notes: props.user.notes
            });
            history.push('/dashboard');
        }
        else{
            if(password.length<5)
                setErrorMessage("Please input a password of atleast 5 characters")
            else
                setErrorMessage("Entered password did not match")
            setShow(true);  
        }

    }
    
    return (
        <div className="bg-light" style={divStyle}>
            <img src={lockimg} style={{width:"60%",marginLeft:"20%"}} />
            <Form onSubmit={formSubmit}>
                <h2 className="mt-5">Enter password to continue</h2>
                <InputGroup className="mb-3 mt-5">
                    <FormControl
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </InputGroup>
                <Button variant="primary" type="submit" className="mt-3 btn-block">
                    DONE
                </Button>

                {
                    show === true ?
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <p>
                            {errorMessage}
                        </p>
                    </Alert>:""

                }
            </Form>
        </div>
    )
}
