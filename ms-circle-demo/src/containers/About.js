import React from 'react'
import { Col, Grid, Navbar, Nav, NavItem, Row, Image } from 'react-bootstrap'
import circleImage from '../assets/Calculate-the-Area-of-a-Circle.png';   // Tell Webpack this JS file uses this image


let headerStyle = {
  background: "#eee",
  padding: "20px",
  margin: "20px"

};
const About = () => (
  <div>
    <Navbar inverse fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Home</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Nav pullRight>
        <NavItem eventKey={1} href="/about-us">About</NavItem>
      </Nav>
    </Navbar>
    <p />
    <h1 style={headerStyle} >About</h1>
    <Grid>
      <Row>
        <Col xs={6} md={4}>
          <Image src={circleImage} thumbnail alt="Area of a circle" />
        </Col>
        {' '}
        <Col xs={6} md={4}>
          <p>This demo was created to demonstrate the following technologies:</p>
          <ul>
            <li>React-bootstrap</li>
            <li>Redux</li>
            <li>React-router</li>
            <li>Fetch API</li>
          </ul>
          <p>Created by <strong>Michael Searson</strong>, with a lot of help from the OSS Community!</p>
          
        </Col>
      </Row>
    </Grid>

  </div>
)

export default About
