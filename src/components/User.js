import React from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import userImage from '../styles/images/user__image.png';
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
    <section className="user">
      <img className="user__image" src={userImage} alt="изображение с профилями людей"/>
      <h3 className="user__title">ГРАЖДАНИН-ПОЭТ</h3>
      <Switch>
        <Route path="/user" exact>
          <div className="user__lobby">
            <Link to="/user/sign-up"><button>Создать аккаунт</button></Link>
            <Link to="/user/sign-in"><button>Войти</button></Link>
          </div>
        </Route>
        <Route path="/user/sign-up" exact>
          <form className="user__form" onSubmit={signUp}>
            <input type="text" placeholder="Полное имя" ref={signUpNameInputRef} required/>
            <input type="email" placeholder="Email" ref={signUpEmailInputRef} required/>
            <span>{errorMsg}</span>
            <input type="password" placeholder="Пароль" ref={signUpPassInputRef} required/>
            <button type="submit">Создать аккаунт</button>
          </form>
          <span className="user__question">Уже есть аккаунт? <Link to="/user/sign-in">Войдите</Link></span>
        </Route>
        <Route path="/user/sign-in" exact>
          <form className="user__form" onSubmit={signIn}>
            <input type="email" placeholder="Email" ref={signInEmailInputRef} required/>
            <input type="password" placeholder="Пароль" ref={signInPassInputRef} required/>
            <span>{errorMsg}</span>
            <button type="submit">Войти</button>          
          </form>
          <span className="user__question">Нет аккаунта? <Link to="/user/sign-up">Регистрация</Link></span>
        </Route>
      </Switch>

    </section>
  );
}

export default User; 
