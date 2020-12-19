import React from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import image from '../styles/images/SignInUpReq__image.png'
import {
  Switch,
  Route,
  Link, 
  useHistory
} from "react-router-dom";

function User() {
  const signUpNameInputRef = React.useRef();
  const signUpEmailInputRef = React.useRef();
  const signUpPassInputRef = React.useRef();
  const signInEmailInputRef = React.useRef();
  const signInPassInputRef = React.useRef();
  const [errorMsg, setErrorMsg] = React.useState('');
  const history = useHistory();

  function signUp(event) {
    event.preventDefault();
    const user = {
      name: signUpNameInputRef.current.value,
      email: signUpEmailInputRef.current.value,
      password: signUpPassInputRef.current.value
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

  function signIn(event) {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(signInEmailInputRef.current.value, signInPassInputRef.current.value)
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

  function createUser(user) {
    var userData = {
      uid: user.user.uid,
      email: user.user.email,
      name: signUpNameInputRef.current.value
    };
    var updates = {};
    updates['/users/' + userData.uid] = userData;
    setTimeout(() => history.push('/'), 2000);
    return firebase.database().ref().update(updates);
  }

  return (
    <section className="user user_sign">
      <img className="user__image" src={image} alt=""/>
      <Switch>
        <Route path="/user/sign-up" exact>
          <div class="user__container">
            <div class="user__box">
              <form className="user__form" onSubmit={signUp}>
                <input className="user__input" type="text" placeholder="Имя" ref={signUpNameInputRef} required/>
                <input className="user__input" type="text" placeholder="Фамилия" ref={signUpNameInputRef} required/>
                <input className="user__input" type="email" placeholder="Email" ref={signUpEmailInputRef} required/>
                <span>{errorMsg}</span>
                <input className="user__input user__input_password" type="password" placeholder="Пароль" ref={signUpPassInputRef} required/>
                <button className="button user__button" type="submit">Создать аккаунт</button>
              </form>
              <span className="user__question">Уже есть аккаунт? <Link to="/user/sign-in">Войдите</Link></span>
            </div>
          </div>
        </Route>
        <Route path="/user/sign-in" exact>
          <div class="user__container">
            <div class="user__box">
              <form className="user__form" onSubmit={signIn}>
                <input className="user__input" type="email" placeholder="Email" ref={signInEmailInputRef} required/>
                <input className="user__input user__input_password" type="password" placeholder="Пароль" ref={signInPassInputRef} required/>
                <span>{errorMsg}</span>
                <button className="button user__button" type="submit">Войти</button>          
              </form>
              <span className="user__question">Нет аккаунта? <Link to="/user/sign-up">Регистрация</Link></span>
            </div>
          </div>
        </Route>
      </Switch>

    </section>
  );
}

export default User; 
