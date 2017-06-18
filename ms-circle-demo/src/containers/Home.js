import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Grid, Navbar, Nav, NavItem, Jumbotron } from 'react-bootstrap'
import { connect } from 'react-redux'
import CalculateForm from './CalculateForm'

const headerStyles = {
  textAlign: "center"
};

const Home = props => (
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
    <Jumbotron>
      <Grid>
        <h2 style={headerStyles} >Welcome!</h2>
        <p style={headerStyles} >  What is the area of a circle given its radius?</p>
        <hr className="my-4" />
        <div>
          <CalculateForm  props={props} />
        </div>
      </Grid>
    </Jumbotron>
   
  </div >
)

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
