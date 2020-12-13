import React from 'react';
import '../index.css';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import poems from '../utils/poems';

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
  const inputRef = React.useRef();
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

  function findPoem(arr, str) {
    let inputArr = str.trim().split(' ');
    let result = {};
    let maxCoincidences = 0;
    for (let i = 0; i < arr.length; i++) {
      let coincidences = 0;
      for (let j = 0; j < inputArr.length; j++) {
        if (arr[i].fields.text.toLowerCase().includes(inputArr[j]) && (inputArr[j].length > 2)) {
          coincidences++;
        }
      }
      if (coincidences > maxCoincidences) {
        maxCoincidences = coincidences;
        result = arr[i];
      }
    }
    return result
  }
  
  function cutPoem(poem) {
    const strArr = poem.split('\n');
    const length = strArr.length > 15 ? 15 : strArr.length;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += `${strArr[i]}\n`
    }
    return result
  }

  function handleSubmit(event) {
    event.preventDefault();
    findPoem(poems, inputRef.current.value);
    var petitionData = {
      realText: inputRef.current.value,
      poem: findPoem(poems, inputRef.current.value)
    };
    var newPetitionKey = firebase.database().ref().child('petition').push().key;
  
    var updates = {};
    updates['/petitions/' + newPetitionKey] = petitionData;
  
    return firebase.database().ref().update(updates);
  }

  return (
    <div className="App">
      <div className="page">
        <header className="header">header</header>
        <main className="main">
          <form className="petition-form" onSubmit={handleSubmit}>
            <input className="petition-form__input" type="text" ref={inputRef}/>
            <button type="submit" className="petition-form__submit-btn">Найти</button>
          </form>
          <div className="petitions">
          {petitions.map((petition) => {
            return(
              <div className="petitions__item">
                <h3 className="petitions__title">{petition.poem.fields.name}</h3>
                <p>Пользователь ввел:</p>
                <p className="petitions__text">{petition.realText}</p>
                <p>Стих (первые 15 строчек):</p>
                <p className="petitions__text">{petition.poem.fields.text}</p>
              </div>)
            })}
          </div>
        </main>
        <footer className="footer">footer</footer>
      </div>
    </div>
  );
}

export default App;
