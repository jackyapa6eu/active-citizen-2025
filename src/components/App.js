import React from 'react';
import '../index.css';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import Petitions from './Petitions';
import PetitionForm from './Petition-form';
import User from './User';

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
  React.useEffect(() => {
    authUser();
    getPetitions();
  }, [])

  function getPetitions() {
    const petitionsRef = firebase.database().ref('petitions/');
    petitionsRef.once('value', (snapshot) => {
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
        console.log(user);
      } else {
        console.log('no user');
        }
    });   
  }

  return (
    <div className="App">
      <div className="page">
        <header className="header">
          <Link to="/active-citizen-2025">домой</Link>
          <Link to="/active-citizen-2025/user">пользователь</Link>
        </header>
        <main className="main">
          <Switch>
            <Route exact path="/active-citizen-2025/">
              <PetitionForm/>
              <Petitions petitions={petitions}/>
            </Route>
            <Route path="/active-citizen-2025/user">
              <User/>
            </Route>
          </Switch>
        </main>
        <footer className="footer">footer</footer>
      </div>
    </div>
  );
}

export default App;
