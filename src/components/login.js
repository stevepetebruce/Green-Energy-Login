import React, { useState, useEffect, useReducer } from 'react';

import { validate, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../utils/validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      }
    default:
      return state;
  }
} 

function Login() {
  const [inputState, dispatch] = useReducer(inputReducer, {value:'', isValid: false, isTouched: false});
  const [checked, setChecked] = useState(true);
  const [inputValue, setInputValue] = useState("");
  
  const handleChange = (e) => {
    dispatch({type: 'CHANGE', val: e.target.value, validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()] })
    setInputValue(inputState.value)
  }

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(!inputValue || !inputState.isValid) return;
    checked ? localStorage.setItem('email', inputState.value) : localStorage.clear('email');
  }

  useEffect(() => {
    const email = localStorage.getItem('email');
    setInputValue(email);
  },[])

  return (
    <div className="login-container">
      <img src="./images/logo/logo-r.svg" className="logo login-logo" alt="logo"/>
      <h1>Example login screen</h1>
      <p>Getting started with Green.</p>
      <form action="">
        <label htmlFor="email" required>Email Address</label>
        <input type="email" value={inputState.value || inputValue} className={`${!inputState.isValid && inputState.isTouched && 'input-invalid'}`} onChange={handleChange} onBlur={touchHandler} />
        {!inputState.isValid && inputState.isTouched && <p className="error-message">Please enter an email address</p>}
        <label class="checkbox-container" htmlFor="rememberDevice">Remember this device
          <input type="checkbox" id="rememberDevice" name="rememberDevice" value={checked} defaultChecked={true} onChange={() => setChecked(checked => !checked)}/>
          <span class="checkmark"></span>
        </label>
        <div className="button-container">
          <button onClick={handleClick}>Sign In</button>
        </div>
      </form>
    </div>
  )
}

export default Login
