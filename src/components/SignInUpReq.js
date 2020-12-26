import React from 'react';
import people from '../styles/images/people.png'
import UserContext from '../contexts/UserContext';
import {
  Link
} from "react-router-dom";

function SignInUpReq() {
  const user = React.useContext(UserContext);
  return (
    <section className="sign-in-up-req">
      <div className="sign-in-up-req__container">
        <h1 className="sign-in-up-req__title">Первая социальная сеть для размещения поэтических публикаций </h1>
        <p className="sign-in-up-req__description">
          {'Регистрируйся, делись своим мнением в форме поэзии и получай реакцию со всей страны.'}
        </p>
        {user.uid && <Link to="/add-new" className="button sign-in-up-req__btn sign-in-up-req__btn_publish">Новая публикация</Link>}
        <div className="sign-in-up-req__btns-wrapper">
          {!user.uid && <Link to="/user/sign-up" className="button sign-in-up-req__btn sign-in-up-req__btn_sign-up" type="button">Регистрация</Link>}
          {!user.uid && <Link to="/user/sign-in" className="button sign-in-up-req__btn sign-in-up-req__btn_sign-in" type="button">Вход</Link>}
        </div>
        <img className="sign-in-up-req__image" src={people} alt="#"/>
      </div>
    </section>
  );
}

export default SignInUpReq; 
