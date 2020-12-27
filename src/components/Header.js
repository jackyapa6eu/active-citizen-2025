import React from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import {
  Link,
  useLocation
} from "react-router-dom";
import headerLogo from '../styles/images/logo.png';
import UserContext from '../contexts/UserContext';
import UserQuestion from './UserQuestion';
import classNames from 'classnames';

function Header({setUser}) {
  let location = useLocation();
  const user = React.useContext(UserContext);
  const [isUserOpened, setIsUserOpened] = React.useState(false);
  React.useEffect(() => {
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  function signOut() {
    firebase.auth().signOut().then(function() {
      setUser({})
      console.log('signOut success');
    }).catch(function(error) {
      console.log(error);
    });
  }

  const userIconSelectors = classNames(
    'header__user-icon',
    {
      'hidden' : (!user.uid || location.pathname === "/user/sign-in" || location.pathname === "/user/sign-up")
    }
  )

  const buttonContainerSelectors = classNames (
    'header__button-container',
    {
      'hidden': (user.uid || location.pathname === "/user/sign-in" || location.pathname === "/user/sign-up")
    }
  )

  const loginContainerSelectors = classNames (
    'header__log-container',
    {
      hidden: !isUserOpened
    }
  )

  function handleUserIconClick() {
    setIsUserOpened(!isUserOpened);
  }

  return (
    <header className="header">
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src={headerLogo} alt="Логотип Гражданин-поэт"/>
        <p className="header__logo-title">гражданин-поэт</p>
      </Link>
      <div className={userIconSelectors} onClick={handleUserIconClick}>
        <div className={loginContainerSelectors}>
          <span className="header__user-name">{user.secondName} {user.name}</span>
          <Link to='/add-new' className="header__add-new-link">Создать публикацию</Link>
          <button onClick={signOut} className="header__quite-btn">Выход</button>
        </div>
      </div>

      <div className={buttonContainerSelectors}>
        <Link to="/user/sign-in" className="button button_white " type="button">Войти</Link>
        <Link to="/user/sign-up" className="button header__button-sing-up" type="button">Регистрация</Link>
      </div>
      {!user.uid && <Link to="/user/sign-in" className="header__sign-in-mobile-icon"/>}
      {location.pathname === "/user/sign-in" && 
        <UserQuestion question={'Нет аккаунта? '} path={'/user/sign-up'} linkText={'Регистрация'} place={'header'}/>
      }
      {location.pathname === "/user/sign-up" && 
        <UserQuestion question={'Уже есть аккаунт? '} path={'/user/sign-in'} linkText={'Войти'} place={'header'}/>
      }
    </header>
  );
}

export default Header; 
