import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './Signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  useEffect(() => {
        const errs = []
        // if(username.length < 3 || username.length >= 25) errs.push("Username must be between 3 and 25 characters")
        // // if(!email.split(" ").includes('@').join("")) errs.push("Please provide a valid email")
        if(repeatPassword !== password) errs.push('Passwords must match')
        // if(password.length < 5 || password.length > 16) errs.push('Please provide a password between 5 and 16 characters')
        setErrors(errs)
    }, [repeatPassword, password])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='signup-form-container' onSubmit={onSignUp}>
      <h2>Signup</h2>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='user-input'>
        <label></label>
        <input
          id='user-input'
          placeholder='Username'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='user-input'>
        <label></label>
        <input
          id='user-input'
          placeholder='Email'
          type='email'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='user-input'>
        <label></label>
        <input
          id='user-input'
          placeholder='Password'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          // required={true}
        ></input>
      </div>
      <div className='user-input'>
        <label></label>
        <input
          id='user-input'
          placeholder='Confirm Password'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          // required={true}
        ></input>
      </div>
      <button id='signup-button' type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
