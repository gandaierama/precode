import React, {useState} from 'react'
import { Alert, Button, Card, Navbar, Container, Form, FormControl, Row, Col, Modal} from 'react-bootstrap';

function Cadastro({show, setShow}) {
  const urlCad='https://sheltered-meadow-49957.herokuapp.com/api/clients';

  const [validated, setValidated] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleSuccess=()=>{
    setSucesso(true);
    setTimeout(function() {
      setSucesso(false);
    }, 4000);
  }

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
      setValidated(false);
      setShow(false);
      handleSuccess();

      return response?.json();
    } catch (e) {
    console.log('Error')
    }

    
  }


  return (
    <>
    {sucesso &&
      <Alert variant="success" className="w-100 text-center">
   
        <div >
          Yep kay yeah!! Cadastro criado com sucesso!!
        </div>
       
      </Alert>
    }
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form noValidate validated={validated} onSubmit={submitCad}>
          
            <Form.Group className="mb-3" >
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="nome" required onChange={handleChangeCad} value={nome} placeholder="Digite seu nome" />
              <Form.Control.Feedback>Ok!!!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Fale seu nome</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Endereço</Form.Label>
              <Form.Control type="text" name="endereco" required onChange={handleChangeCad} value={endereco} placeholder="Digite seu endereço" />
              <Form.Control.Feedback>Ok!!!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Fale seu endereço</Form.Control.Feedback>
            </Form.Group>
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
              Cadastrar
            </Button>
        
          </Form>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default Cadastro