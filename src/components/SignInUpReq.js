import React from 'react';
import image from '../styles/images/SignInUpReq__image.png'
import people from '../styles/images/people.png'
import {
  Link
} from "react-router-dom";

function SignInUpReq({closeRequest}) {
  return (
    <section className="sign-in-up-req">
      <div className="sign-in-up-req__container">
        <h1 className="sign-in-up-req__title">Первая социальная сеть для размещения поэтических публикаций </h1>
        <p className="sign-in-up-req__description">
          {'Регистрируйся, делись своим мнением в форме поэзии и получай реакцию со всей страны.'}
        </p>
        <Link to="/user/sign-up" className="button sign-in-up-req__btn sign-in-up-req__btn_sign-up" type="button">Регистрация</Link>
        <img className="sign-in-up-req__image" src={people} alt="#"/>
      </div>
    </section>
  );
}

export default SignInUpReq; 
