import React, {useState} from 'react'
import { Button, Card, Navbar, Container, Form, FormControl, Row, Col, Modal} from 'react-bootstrap';

function Login({show2, setShow2}) {
  const urlCad='https://sheltered-meadow-49957.herokuapp.com/api/clients';

  const [validated, setValidated] = useState(false);
  const handleClose = () => setShow2(false);
  const handleShow = () => setShow2(true);

  const [formValue, setFormValue] = useState({
    email: "",
    nome: "",
    senha: "",
    endereco: "",
  });

  const handleChangeCad = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { email, nome, senha, endereco } = formValue;


  async function submitCad(event) {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) 
      event.stopPropagation();

    setValidated(true);
    if( form.checkValidity() === false) return false;

    const valCad ={
      data:{
        name:nome, 
        email:email, 
        password: senha, 
        address: endereco
      }
    };

    try {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(valCad),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      };
      const response = await fetch(urlCad, requestOptions);
      
      setFormValue({
        email: "",
        nome: "",
        senha: "",
        endereco: "",
      });

      setShow2(false);

      return response?.json();
    } catch (e) {
    console.log('Error')
    }

    
  }


  return (
    <>
      <Modal
        show={show2}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form noValidate validated={validated} onSubmit={submitCad}>
          
            <Form.Group className="mb-3" >
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" name="email" required onChange={handleChangeCad} value={email} placeholder="Digite seu e-mail" />
              <Form.Control.Feedback>Validado!!!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Use um e-mail válido!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" name="senha" required onChange={handleChangeCad} value={senha} placeholder="Escolha uma senha" />
              <Form.Control.Feedback>Senha preenchida!!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Escolha uma boa senha!</Form.Control.Feedback>
            </Form.Group>
          
            <Button variant="primary btn-lx" type="submit">
              Entrar
            </Button>
        
          </Form>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login