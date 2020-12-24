import React from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import {
  useHistory
} from "react-router-dom";
import classNames from 'classnames';

function SignInForm() {
  const signInPassInputRef = React.useRef();
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const [passIsVisible, setPassIsVisible] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  function signIn(event) {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, signInPassInputRef.current.value)
        .then( response => {
          setTimeout(() => history.push('/'), 2000);
        })
        .catch( error => {
            if (error.code === "auth/user-not-found") {
              setErrorMsg('Пользователь не найден.');
            }
            else if (error.code === "auth/wrong-password") {
              setErrorMsg('Неправильный пароль.');
            }
            else if (error.code === "auth/too-many-requests") {
              setErrorMsg('Слишком частые запросы, попробуйте позднее');
            }
            else {
              setErrorMsg('Неизвестная ошибка, попробуйте позднее.');
            }
            setTimeout(() => setErrorMsg(''), 2000);
        })
  }

  function togglePassSignIn() {
    if (passIsVisible) {
      signInPassInputRef.current.type = 'password';
      setPassIsVisible(false);
    } else {
      signInPassInputRef.current.type = 'text';
      setPassIsVisible(true);
    }
  }

  function handleEmailInput(event) {
    setEmail(event.target.value);
  }

  const togglePassBtnSelectors = classNames(
    'user__toggle-pass-btn',
    {
      'user__toggle-pass-btn_opened': passIsVisible
    }
  )
  
  return (
    <form className="user__form" onSubmit={signIn}>
      <input 
        className="user__input" 
        type="email" 
        placeholder="Email" 
        onChange={handleEmailInput} 
        value={email || ''}
        required
      />
      <label className='user__pass-label'>
        <input className="user__input user__input_password" type="password" placeholder="Пароль" ref={signInPassInputRef} required/>
        <button className={togglePassBtnSelectors} type="button" onClick={togglePassSignIn}/>
      </label>
      <span>{errorMsg}</span>
      <button className="button user__button" type="submit">Войти</button>          
  </form>
  );
}

export default SignInForm; 
