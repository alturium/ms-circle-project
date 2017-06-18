import handleErrors from '../helpers/http-util'

export const SET_INPUT = 'calculate/SET_INPUT'
export const CALCULATE_REQUESTED = 'calculate/CALCULATE_REQUESTED'
export const UPDATE_CALCULATION = 'calculate/UPDATE_CALCULATION'
export const INPUT_HAS_CHANGED = 'calculate/INPUT_HAS_CHANGED'

//-----------------------------------------------------
// actions
//-----------------------------------------------------

export const setInput = (input) => {
  return dispatch => {
    dispatch({ type: SET_INPUT, input:input })
  }
}

export const setInputHasChanged = (inputHasChanged) => {
  return dispatch => {
    dispatch({ type: INPUT_HAS_CHANGED, inputHasChanged:inputHasChanged} );
  }
}

export const calculate = (input) => {
  return dispatch => {
    dispatch({ type: CALCULATE_REQUESTED })

    fetch('/calculate', {
      method: 'POST',
      headers: {'Accept': 'application/json',  'Content-Type': 'application/json'},
      cache: 'default',
      body: JSON.stringify({ input: input })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(response => dispatch({ type: UPDATE_CALCULATION, response:response }))
      .catch(error => {
        console.log(error)

        let errorResponse = { "success": false, "output": null, operation: "calc-area-of-circle", "error": error }
        
        dispatch({type: UPDATE_CALCULATION, response : errorResponse})
      })
  }
}

//-----------------------------------------------------
// reducers
//-----------------------------------------------------

const initialState = {
  input: 1,
  initialInput: 1,
  inputHasChanged: false,
  answer: 0,
  isCalculating: true,
  errorCondition: false,
  calcResponse: { "success": true, "output": 31415.926535897932384626433832795, operation: "calc-area-of-circle", "error": null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INPUT:
      //console.log('input=' + action.input)
      return Object.assign({}, state, { input: action.input });
    case INPUT_HAS_CHANGED:
     // console.log('inputHasChanged' + action.inputHasChanged)
      return Object.assign({}, state, { inputHasChanged: action.inputHasChanged, answer: "" });
    case CALCULATE_REQUESTED:
      return {
        ...state,
        isCalculating: true
      }
    case UPDATE_CALCULATION:
    //TODO: fix output to answer in service -mes
     // console.log(action.response.output)
      return Object.assign({}, state, { answer: action.response.output, calcResponse: action.response });
    default:
      return state
  }
}