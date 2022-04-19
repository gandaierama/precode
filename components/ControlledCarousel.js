import { Carousel, Button,  Container,  Row, Col} from 'react-bootstrap';
import React, {useState} from 'react'

const  ControlledCarousel=({info})=> {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="d-none d-md-block" style={{ width:'100%', padding:30, backgroundColor:'#009FE3', marginBottom:30}}>

    {info.map((item, index) => (
      <Carousel.Item key={index} style={{ width:'100%', padding:30, backgroundColor:'#009FE3'}}>
      <Container fluid className="w-100 ">
      <Row >
      <Col md={5}>

      <div className="justify-content-center">
        <img
          className="d-block mx-auto"
          style={{ height:300, borderRadius:'20px', border:'20px solid #fff'}}
          src={item.attributes.link_image}
          alt="First slide"
        />
      </div>
       </Col>
       <Col md={5} style={{ color:'#fff', textAlign:'center'}}>
   
          <h1>{item.attributes.title}</h1>
          <h4>{item.attributes.description}</h4>
          <hr/>
          <h2><span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize:15}}>de R${item.attributes.price.toLocaleString('pt-BR')}</span>
          <br/> por R$ {item.attributes.price_promotional.toLocaleString('pt-BR')}</h2>
        </Col>
      </Row>
      </Container>
      </Carousel.Item>
    ))}
      
    </Carousel>
  );
}

export default ControlledCarousel