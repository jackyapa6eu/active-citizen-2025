import React from 'react';
import image from '../styles/images/SignInUpReq__image.png'
import {
  Link
} from "react-router-dom";

function SignInUpReq({closeRequest}) {
  return (
    <section className="sign-in-up-req">
      <button type="button" className="sign-in-up-req__close-btn" onClick={closeRequest}/>
      <img className="sign-in-up-req__image" src={image} alt=""/>
      <div className="sign-in-up-req__info">
        <h1 className="sign-in-up-req__title">
          {'Первое сообщество\n активных граждан\n для публикации\n поэтических обращений'}
        </h1>
        <p className="sign-in-up-req__description">
          {'Регистрируйся, создавай cобственную\n инициативу и получай поддержку\n активных граждан со всей страны.'}
        </p>
        <div className="sign-in-up-req__buttons">
          <Link to="/user/sign-in" className="sign-in-up-req__btn sign-in-up-req__btn_sign-in" type="button">Войти</Link>
          <Link to="/user/sign-up" className="button sign-in-up-req__btn sign-in-up-req__btn_sign-up" type="button">Регистрация</Link>
        </div>
      </div>
    </section>
  );
}

export default SignInUpReq; 
