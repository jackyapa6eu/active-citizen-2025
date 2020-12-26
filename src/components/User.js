import React from 'react';
import "firebase/auth";
import imageMan from '../styles/images/image3.png'
import imageWoman from '../styles/images/image2.png'
import {
  Switch,
  Route
} from "react-router-dom";
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import Popup from './Popup';
import successRegistation from '../utils/popupTexts';
import UserQuestion from './UserQuestion';

function User() {
  const [isSuccessed, setIsSuccessed] = React.useState(false);
  return (
    <section className="user">
      <Switch>
        <Route path="/user/sign-up" exact>
          <img className="user__image" src={imageMan} alt=""/>
          <div className="user__box">
            {isSuccessed ? <Popup text={successRegistation}/> : <SignUpForm setIsSuccessed={setIsSuccessed}/>}
            <UserQuestion question={'Уже есть аккаунт? '} path={'/user/sign-in'} linkText={'Войти'} place={'user'}/>
          </div>
        </Route>
        <Route path="/user/sign-in" exact>
          <img className="user__image" src={imageWoman} alt=""/>
          <div className="user__box">
            <SignInForm/>
            <UserQuestion question={'Нет аккаунта? '} path={'/user/sign-up'} linkText={'Регистрация'} place={'user'}/>
          </div>
        </Route>
      </Switch>

    </section>
  );
}

export default User; 
