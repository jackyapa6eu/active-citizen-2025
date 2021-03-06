import React from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import {
  Link,
  useHistory
} from "react-router-dom";
import headerLogo from '../styles/images/header__logo.png';
import UserContext from '../contexts/UserContext';

function Header({setUser}) {
  const history = useHistory();
  const user = React.useContext(UserContext);
  function signOut() {
    firebase.auth().signOut().then(function() {
      setUser({})
      console.log('signOut success');
    }).catch(function(error) {
      console.log(error);
    });
  }
  function openAddNew() {
    history.push("/add-new");
  }
  return (
    <header className="header">
      <Link to="/"><img className="header__logo"src={headerLogo} alt="Логотип Гражданин-поэт"/></Link>
      {user.uid ? <div><span>{user.name}  </span><span onClick={signOut}>  выход</span></div> : <Link to="/user">пользователь</Link>}  
      <button className="header__add-btn" onClick={openAddNew}>Добавить</button>
    </header>
  );
}

export default Header; 
