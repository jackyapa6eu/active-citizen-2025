import React from 'react';
import "firebase/auth";
import image from '../styles/images/SignInUpReq__image.png'
import {
  Switch,
  Route
} from "react-router-dom";
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import UserQuestion from './UserQuestion';
import Popup from './Popup';
import successRegistation from '../utils/popupTexts';

function User() {
  const [isSuccessed, setIsSuccessed] = React.useState(false);
  return (
    <section className="user user_sign">
      <img className="user__image" src={image} alt=""/>
      <Switch>
        <Route path="/user/sign-up" exact>
          <div className="user__container">
            <div className="user__box">
              {isSuccessed ? <Popup text={successRegistation}/> : <SignUpForm setIsSuccessed={setIsSuccessed}/>}
              {!isSuccessed && <UserQuestion question={'Уже есть аккаунт? '} path={'/user/sign-in'} linkText={'Войдите'}/>}
            </div>
          </div>
        </Route>
        <Route path="/user/sign-in" exact>
          <div className="user__container">
            <div className="user__box">
              <SignInForm/>
              <UserQuestion question={'Нет аккаунта? '} path={'/user/sign-up'} linkText={'Регистрация'}/>
            </div>
          </div>
        </Route>
      </Switch>

    </section>
  );
}

export default User; 
