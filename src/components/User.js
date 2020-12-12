import React from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import userImage from '../styles/images/user__image.png';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

function User() {
  const signUpNameInputRef = React.useRef();
  const signUpEmailInputRef = React.useRef();
  const signUpPassInputRef = React.useRef();
  const [errorMsg, setErrorMsg] = React.useState('');
  function signUp(event) {
    event.preventDefault();
    const user = {
      name: signUpNameInputRef.current.value,
      email: signUpEmailInputRef.current.value,
      password: signUpPassInputRef.current.value
    }
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error);
      setErrorMsg(error.message);
    });    
  }
  return (
    <section className="user">
      <img className="user__image" src={userImage} alt="изображение с профилями людей"/>
      <h3 className="user__title">ГРАЖДАНИН-ПОЭТ</h3>
      <Switch>
        <Route path="/active-citizen-2025/user" exact>
          <div className="user__lobby">
            <Link to="/active-citizen-2025/user/sign-up"><button>Создать аккаунт</button></Link>
            <Link to="/active-citizen-2025/user/sign-in"><button>Войти</button></Link>
          </div>
        </Route>
        <Route path="/active-citizen-2025/user/sign-up" exact>
          <form className="user__form" onSubmit={signUp}>
            <input type="text" placeholder="Полное имя" ref={signUpNameInputRef}/>
            <input type="email" placeholder="Email" ref={signUpEmailInputRef}/>
            <span>{errorMsg}</span>
            <input type="password" placeholder="Пароль" ref={signUpPassInputRef}/>
            <button type="submit">Создать аккаунт</button>
          </form>
          <span className="user__question">Уже есть аккаунт? <Link to="/active-citizen-2025/user/sign-in">Войдите</Link></span>
        </Route>
        <Route path="/active-citizen-2025/user/sign-in" exact>
          <form className="user__form">
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Пароль"/>
            <button type="submit">Войти</button>          
          </form>
          <span className="user__question">Нет аккаунта? <Link to="/active-citizen-2025/user/sign-up">Регистрация</Link></span>
        </Route>
      </Switch>

    </section>
  );
}

export default User; 
