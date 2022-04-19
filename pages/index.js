import Head from 'next/head'
import Image from 'next/image'
import React, {useState} from 'react'
import styles from '../styles/Home.module.css'
import {FooterPre, Cadastro, ControlledCarousel, HeaderPre, Carrinho, Login } from '../components'
import { Carousel, Button, Card, Navbar, Container, Form, FormControl, Nav, NavDropdown, Row, Col, Dropdown, DropdownButton, Modal} from 'react-bootstrap';
import {FaUserAlt, FaShoppingCart} from "react-icons/fa";



const HeadPrecode =()=>{
  return(
    <Head>
      <title>Teste PreCode</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/logo.png" />

    </Head>
  );
}




const Listagem =({info, add})=>{
  return (
    <Container>
      <Row>
        {info.map((item, index) => (
          <Col key={index}>
          <Card className="mb-3 p-3" style={{ width: '18rem' }} >
            <Card.Img variant="top" style={{ maxHeight: '200px', minHeight: '200px' }}   src={item.attributes.link_image} />
            <Card.Body>
              <Card.Title>{item.attributes.title}</Card.Title>
         
              <Button variant="success">Comprar</Button>
              <Button variant="primary" onClick={()=>add({item})} style={{marginLeft:20}}>Add <FaShoppingCart/></Button>
            </Card.Body>
          </Card>
          </Col>
        ))}
        </Row>
      </Container>
  );
}
export default function Home(props) {

  let info =props.data.data;

  const [carr, setCarr] = useState({
    itens: [],
    total: 0
  });

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleShow3 = () => setShow3(true);

  const add =(ad)=>{
    console.log(ad);


    carr.itens.push({id: ad.item.id, qtd: 1, value: ad.item.attributes.price});



    console.log(carr);
  }

 

  return (
    <div >
      <HeadPrecode/>
      <HeaderPre handleShow={handleShow} handleShow2={handleShow2} handleShow3={handleShow3}   />
      

      <main className={styles.main}>
        <Cadastro show={show} setShow={setShow}/>
        <ControlledCarousel info={info}/>
        <Listagem info={info} add={add} />
      </main>

      <FooterPre />


      
      <Login show2={show2} setShow2={setShow2}/>
      <Carrinho show3={show3} setShow3={setShow3} carr={carr}/>

    </div>
  )
}



export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://sheltered-meadow-49957.herokuapp.com/api/products`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}