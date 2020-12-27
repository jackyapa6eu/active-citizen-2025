import React from 'react';
import '../index.css';
import {
  Switch,
  Route
} from "react-router-dom";
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import UserContext from '../contexts/UserContext';
import User from './User';
import Header from './Header';
import AddNew from './AddNew';
import OpenedPetition from './OpenedPetition';
import SignInUpReq from './SignInUpReq';
import Feed from './Feed';
import Footer from './Footer';

const firebaseConfig = {
  apiKey: "AIzaSyBRR8gvYPh4zoGSzmQcyDz4vtkiS66NDFU",
  authDomain: "active2025citizen.firebaseapp.com",
  databaseURL: "https://active2025citizen-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "active2025citizen",
  storageBucket: "active2025citizen.appspot.com",
  messagingSenderId: "49359637610",
  appId: "1:49359637610:web:afbe7368807433be4c8e13"
};
firebase.initializeApp(firebaseConfig);

function App() {
  const [petitions, setPetitions] = React.useState([]);
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    authUser();
    getPetitions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getPetitions() {
    const petitionsRef = firebase.database().ref('petitions/');
    petitionsRef.on('value', (snapshot) => {
      if (snapshot.val() === null) {
        console.log('ничего нет');
        return
      }
      const obj = snapshot.val();
      const petitionArr = [];
      for (let i = 0; i < Object.keys(obj).length; i++) {
        const petition = obj[Object.keys(obj)[i]];
        petition.id = Object.keys(obj)[i];
        petitionArr.unshift(petition);
      }
      setPetitions(petitionArr);
    })
  }

  function authUser() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        getUserData(user.uid);
      } else {
        console.log('no user');
        }
    });   
  }

  function getUserData(uid) {
    const userRef = firebase.database().ref('users/'+ uid);
    userRef.once('value', (snapshot) => {
      if (snapshot.val() === null) {
        console.log('ничего нет');
        return
      }
      const obj = snapshot.val();
      setUser(obj);
    })
  }

  function showDate(date) {
    let day = new Date(date);
    return `${day.toLocaleString('ru',{day: 'numeric', month: 'long', year: 'numeric'}).replace('г.', '')}`
}

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <div className="page">
          <Header setUser={setUser}/>
          <main className="main">
            <Switch>
              <Route exact path="/">
                <SignInUpReq/>
                <Feed petitions={petitions} showDate={showDate}/>
              </Route>
              <Route path="/user">
                <User/>
              </Route>
              <Route path="/add-new">
                <AddNew/>
              </Route>
              <Route path="/petitions/:pId">
                <OpenedPetition showDate={showDate}/>
              </Route>
            </Switch>
          </main>
          <Footer/>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
