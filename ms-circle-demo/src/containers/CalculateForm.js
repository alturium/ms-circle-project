import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import { BaseForm } from './components/BaseForm'
import { calculate, setInput, setInputHasChanged } from '../state/calculate'
import isnumeric from 'isnumeric'   // found this on github but may not be the best answer!

/**
 * Store the input "radius" locally for onChange events.
 * Note: state 'none' could be 'success' and drives the validationState property for components. 
 */
type CalculateFormState = {
  radius: number,
  prevRadius: number,
  validation: Object
}

const errorStyles = {
  height: '20px',
  color: 'red',
  fontSize: '13px',
  textAlign: 'left'

};

const labelStyles = {
  textAlign: 'right'
};

/**
 * CalculateForm
 * @extends BaseForm
 */
class CalculateForm extends BaseForm {

  state: CalculateFormState;

  constructor(props) {
    super(props);
    this.state = { radius: props.input, prevRadius: props.input, validation: { valid: true, state: null, reason: "" } };
  }

  /**
     * Validate value for specific rules.
     * @param  {} value
     */
  validateInput = (value) => {
    // check if valid number
    let isProvided = !(value === null || value === "");
    let isNumeric = isnumeric(value);
    let isWithinRange = value >= 1 && value <= 100;

    if (!isProvided) {
      return { valid: false, state: "error", reason: "Radius must be provided" }
    }

    if (!isNumeric) {
      return { valid: false, state: "error", reason: "Radius must be numeric" }
    }

    if (!isWithinRange) {
      return { valid: false, state: "error", reason: "Radius must be between 1 and 100" }
    }

    return { valid: true, state: null, reason: "" };
  }


  /**
   * Save radius (input) to allow detection of input changes.
   * @param  {} radius
   */
  saveRadius = (radius) => {
    if (this.props.radius !== this.state.radius)
      this.setState({ prevRadius: radius })
  }
  /**
   * Set inputHasChanged state by comparing previous and current values of radius.
   * @param  {} flag
   */
  triggerInputHasChanged = () => {

    // check if valid
    let validation = this.validateInput(this.state.radius);
    if (JSON.stringify(validation) !== JSON.stringify(this.state.validation))  // fast and limited, but suits our purpose
    {
      this.setState({ validation: validation });
    }

    let change = this.state.radius !== this.state.prevRadius;

    // clear answer if transitioning from false to true
    if (!this.props.inputHasChanged && change) {
      this.props.setInputHasChanged(true);
    }
  }

  render() {
  
    //
    // present the answer
    //
    let theAnswer = "" //default is blank

    if( !this.props.inputHasChanged)
    {
      if (this.props.calcResponse.success && this.props.answer) {
        if(isnumeric(this.props.answer))
          theAnswer = this.props.answer.toFixed(6) // 6 decimal places precision
        else
          theAnswer = this.props.answer  // handle "" empty strings
      }
    }

    let theErrorMessage = ""

    if( !this.props.calcResponse.success && this.props.calcResponse.error)
    {
       // construct a meaningful error message for the user
        theErrorMessage = this.props.calcResponse.error.message;

        if( theErrorMessage && theErrorMessage.valueOf() === "Internal Server Error".valueOf())  // perhaps the server is not running...
        {
          theErrorMessage =  this.props.calcResponse.error +  ".  Maybe the service is not running?"
        }
      console.log(theErrorMessage)
    }

    return <div>

      <Form horizontal onSubmit={e => {
        e.preventDefault()
        if (this.state.validation.valid) {
          this.saveRadius(this.state.radius)
          this.props.setInputHasChanged(false)
          this.props.calculate(this.state.radius)
        }
      } }>

        <FormGroup controlId="formEnterRadius" validationState={this.state.validation.state}>
          <Col componentClass={ControlLabel} xs={5} style={labelStyles} >
            Enter circle radius:
        </Col>
          <Col xs={3} md={3} >
            <FormControl type="text" name="radius"
              value={this.state.radius}
              onChange={this.onChange}
              inputRef={(ref) => { this.input = ref; this.triggerInputHasChanged() } } />
            <FormControl.Feedback />
          </Col>
          
          <Col xs={4} md={4}  componentClass={ControlLabel} style={errorStyles}  >
            {this.state.validation.reason}
          </Col>
        </FormGroup>

        <FormGroup controlId="formAnswer" >
          <Col componentClass={ControlLabel} xs={5} style={labelStyles}  >
            The calculated area is:
        </Col>
          <Col xs={3} md={3}>
            <FormControl readOnly type="text" value={theAnswer} />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup controlId="formSubmitButton" >
          <Col componentClass={ControlLabel} xs={5} >
            {' '}
          </Col>
          <Col xs={4} md={4}>
            <Button type="submit" bsStyle="primary" > Calculate </Button>
          </Col>
        </FormGroup>

        <FormGroup controlId="formErrorMessages" >
           <Col componentClass={ControlLabel} xs={3} md={3} >
            {' '}
          </Col>
          <Col xs={6} md={6}  componentClass={ControlLabel} style={errorStyles}  >
            {theErrorMessage}
          </Col>
        </FormGroup>

      </Form>
    </div >;
  }
}

const mapStateToProps = state => ({
  calcResponse: state.calculate.calcResponse,
  input: state.calculate.input,
  inputHasChanged: state.calculate.inputHasChanged,
  initialInput: state.calculate.initialInput,
  answer: state.calculate.answer,
  isCalculating: state.calculate.isCalculating,
  errorCondition: state.calculate.errorCondition
})

const mapDispatchToProps = dispatch => bindActionCreators({
  calculate,
  setInput,
  setInputHasChanged,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculateForm)