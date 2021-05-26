import React from 'react'
import { Form, Button , InputGroup, FormControl, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router';

export default function CreatePassword(props) {
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
        if(password.length>4){
            props.updateUser({
                islogin : true,
                password : password,
                notes: []
            });
            history.push('/dashboard');
        }
        else{
            setErrorMessage("Please input a password of atleast 5 characters")
            setShow(true);
        }
    }
    
    return (
        <div className="bg-light" style={divStyle}>
            <Form onSubmit={formSubmit}>
                <h2 className="mt-5">Set a password to continue</h2>
                <InputGroup className="mb-3 mt-5">
                    <FormControl
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </InputGroup>
                <Button variant="primary" type="submit" className="mt-3 btn-block mb-2">
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
