import React from 'react';
import { Container, Navbar, Button, Modal, Form, Card, Row, Col, NavDropdown } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { useHistory } from 'react-router';
import './css/Dashboard.css';
export default function Dashboard(props) {

    const history = useHistory();
    let initialNotes = [];
    if (props.user.notes !== null)
        initialNotes = props.user.notes;

    const [initialNote, setInitialNote] = React.useState(initialNotes);
    
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title, setTitle] = React.useState("");
    const [note, setNote] = React.useState("");


    let addForm = (e) =>{
        e.preventDefault();
        console.log("form submitted");
        console.log(title);
        console.log(note);
        setInitialNote(initialNote=>[...initialNote, { title : title, note : note, createdAt : new Date() }]);
        handleClose();
    }


    let deleteNote = (item) =>{
        console.log("delete item",item);
        setInitialNote(
            initialNote.filter((note)=>{
                return note !== item
            })
        )
    }

    React.useEffect(() => {
        console.log("update note");
        props.updateUser({
            islogin : true,
            password: props.user.password,
            notes : initialNote
        })

    }, [initialNote])
    let logout = () =>{
        props.updateUser({
            islogin : false,
            password: props.user.password,
            notes : initialNote
        });
        history.push('/');

    }
    return (
        <div className="bg-light" >
            <Navbar sticky="top" bg="primary" variant="primary">
                <Navbar.Brand className="text-white">Note maker</Navbar.Brand>             
                <NavDropdown title="Account" style={{color:"white"}} id="basic-nav-dropdown" className=" ml-auto">
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>                
            </Navbar>
            
            <Container className="bg-light mt-2"  fluid>
                {
                    initialNote.length > 0 ?
                    initialNote.map((item,idx)=>{
                        return <div key={idx}>
                            <Card className="mt-2" >
                                <Card.Body>
                                    <Row>
                                        <Col xs={9}>
                                            <Card.Subtitle>{item.title}</Card.Subtitle>
                                            <Card.Text>
                                                {item.note}
                                            </Card.Text>
                                            <span style={{fontSize:"small"}}>{item.createdAt === undefined? "": (item.createdAt+"").substr(0,10)}</span>
                                        </Col>
                                        <Col xs={3}>
                                            <Button size="sm" variant="danger" onClick={(e)=>{deleteNote(item)}} >
                                                <BsFillTrashFill></BsFillTrashFill>
                                            </Button>                                            
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>                    
                        </div>
                    })
                    : <h6 className="text-center">No note found</h6>
                }
                <Button  className="btnStyle" onClick={handleShow} type="submit">+</Button>
            </Container>
            <Modal animation={false}  show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addForm}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Label</Form.Label>
                            <Form.Control onChange={(e)=>{setTitle(e.target.value)}} as="select" custom>
                                <option>
                                    Meeting
                                </option>
                                <option>
                                    Call
                                </option>
                                <option>
                                    Password
                                </option>
                                <option>
                                    Event
                                </option>
                                <option>
                                    Last Date
                                </option>
                                <option>
                                    Others
                                </option>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Note</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e)=>{setNote(e.target.value)}} placeholder="your note" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={addForm}>Save</Button>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
