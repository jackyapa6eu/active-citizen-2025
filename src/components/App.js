import React from 'react';
import '../index.css';
import firebase from 'firebase/app';
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
  const [outputPoem, setOutputPoem] = React.useState('');
  
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
    setOutputPoem(result.fields.text);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    findPoem(poems, inputRef.current.value)
  }

  return (
    <div className="App">
      <div className="page">
        <header className="header">header</header>
        <main className="main">
          <form className="petition" onSubmit={handleSubmit}>
            <input className="petition__input" type="text" ref={inputRef}/>
            <button type="submit" className="petition__submit-btn">Найти</button>
            <p className="petition__output-text">
              {outputPoem}
            </p>
          </form>
        </main>
        <footer className="footer">footer</footer>
      </div>
    </div>
  );
}

export default App;
