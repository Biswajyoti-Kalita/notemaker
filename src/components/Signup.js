import React from 'react'
import { Form, Button , InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router';

export default function Signup(props) {
    const history = useHistory();
    let divStyle = {
        padding: "10%",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100vh"
    };
    const [countryCode, setCountryCode] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [getotp, setGetotp] = React.useState(false);
    const [loadingDisplay, setLoadingDisplay] = React.useState(false);

    let formSubmit = (e) =>{
        e.preventDefault();
        setGetotp(true);
        setLoadingDisplay(true);
        console.log("form submitted");
        console.log(loadingDisplay);
        console.log(getotp);
        console.log(countryCode);
        console.log(phoneNumber);
    }    
    
    let formSubmit2 = (e) =>{
        e.preventDefault();
        props.updateUser({
            islogin : true,
            contact : phoneNumber
        });

        history.push('/dashboard');
    }

    return (
        <div className="bg-light" style={divStyle}>

            <Form onSubmit={formSubmit} style={getotp?{display:"none"}:{display:"block"}}>
                <h2 className="mt-5">Enter your phone number to get started</h2>
                <InputGroup className="mb-3 mt-5">
                    <InputGroup.Prepend>
                        <Form.Control onChange={(e)=>{setCountryCode(e.target.value)}} as="select" custom>
                            <option>
                                +91
                            </option>
                            <option>
                                +44
                            </option>
                        </Form.Control>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Phone number"
                        aria-label="Phone"
                        aria-describedby="basic-addon1"
                        onChange={(e)=>{setPhoneNumber(e.target.value)}}

                    />
                </InputGroup>
                <Button variant="primary" type="submit" className="mt-3 btn-block">
                    GET OTP
                </Button>
                <center>
                    {
                        loadingDisplay === true?  <Spinner className="mt-3"  animation="border" variant="secondary" />: <></>
                    }
                </center> 
            </Form>
            <Form onSubmit={formSubmit2} style={getotp?{display:"block"}:{display:"none"}}>
                <h2 className="mt-5">Enter OTP sent to {countryCode} {phoneNumber}</h2>
                <InputGroup className="mb-3 mt-5">
                    <FormControl
                        placeholder="Enter OTP"
                        aria-label="OTP"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Button variant="primary" type="submit" className="mt-3 btn-block">
                    VERIFY OTP
                </Button>
            </Form>

        </div>
    )
}
