import React, {useState} from 'react'
import { Button, Card, Navbar, Container, Form, FormControl, Row, Col, Modal} from 'react-bootstrap';

function Cadastro({show3, setShow3, carr}) {
  const urlCad='https://sheltered-meadow-49957.herokuapp.com/api/clients';

  const [validated, setValidated] = useState(false);
  const handleClose = () => setShow3(false);
  const handleShow = () => setShow3(true);




  return (
    <>
      <Modal
        show={show3}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Carrinho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          

        </Modal.Body>
      </Modal>
    </>
  );
}

export default Cadastro