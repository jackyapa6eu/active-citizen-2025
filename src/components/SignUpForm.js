import React from 'react';
import firebase from 'firebase/app';
import imageBg from '../styles/images/btn_plus.svg';
import "firebase/auth";
import {
  useHistory
} from "react-router-dom";
import classNames from 'classnames';

function SignUpForm({setIsSuccessed}) {
  const passInputRef = React.useRef();
  const [name, setName] = React.useState('');
  const [secondName, setSecondName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const [passIsVisible, setPassIsVisible] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const togglePassBtnSelectors = classNames(
    'user__toggle-pass-btn',
    {
      'user__toggle-pass-btn_opened': passIsVisible
    }
  )

  function togglePassSignUp() {
    if (passIsVisible) {
      passInputRef.current.type = 'password';
      setPassIsVisible(false);
    } else {
      passInputRef.current.type = 'text';
      setPassIsVisible(true);
    }
  }

  function signUp(event) {
    event.preventDefault();
    const user = {
      name,
      secondName,
      email,
      password: passInputRef.current.value
    }
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((user) => {
      createUser(user);
    })
    .catch((error) => {
      console.log(error);
      setErrorMsg(error.message);
      setTimeout(() => setErrorMsg(''), 2000);
    });    
  }

  function createUser(user) {
    var userData = {
      uid: user.user.uid,
      email: user.user.email,
      name,
      secondName
    };
    var updates = {};
    updates['/users/' + userData.uid] = userData;
    setTimeout(() => history.push('/'), 2000);
    setIsSuccessed(true);
    return firebase.database().ref().update(updates);
  }

  function handleNameInput(event) {
    setName(event.target.value);
  }

  function handleSecondNameInput(event) {
    setSecondName(event.target.value);
  }
  
  function handleEmailInput(event) {
    setEmail(event.target.value);
  }

  return (
    <form className="user__form" onSubmit={signUp}>
      <input 
        className="user__input" 
        type="text" 
        placeholder="Имя" 
        onChange={handleNameInput} 
        value={name || ''}
        minLength="2" 
        maxLength="20"
        required
      />
      <input 
        className="user__input" 
        type="text" 
        placeholder="Фамилия" 
        onChange={handleSecondNameInput} 
        value={secondName || ''}
        minLength="2" 
        maxLength="20"
        required
      />
      <input 
        className="user__input" 
        type="email" 
        placeholder="Email" 
        onChange={handleEmailInput} 
        value={email || ''}
        minLength="4" 
        maxLength="40"
        required
      />
      <span>{errorMsg}</span>
      <label className='user__pass-label'>
        <input 
          className="user__input user__input_password" 
          type="password" 
          placeholder="Пароль" 
          ref={passInputRef} 
          minLength="6" 
          maxLength="20" 
          required
        />
        <button className={togglePassBtnSelectors} type="button" onClick={togglePassSignUp}/>
      </label>
      <button className="button user__button" type="submit">Создать аккаунт</button>
    </form>
  );
}

export default SignUpForm; 
