import React from 'react';
import poems from '../utils/poems';
import firebase from 'firebase/app';
import "firebase/database";
import UserContext from '../contexts/UserContext';
import {
  useHistory
} from "react-router-dom";

function AddNew() {
  const user = React.useContext(UserContext);
  const inputRef = React.useRef();
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [isDisabled, setisDisabled] = React.useState(true);
  const history = useHistory();

  function findPoem(arr, str) {
    let inputArr = str.trim().split(' ');
    let result = {};
    let maxCoincidences = 0;
    for (let i = 0; i < arr.length; i++) {
      let coincidences = 0;
      for (let j = 0; j < inputArr.length; j++) {
        if (arr[i].text.toLowerCase().includes(inputArr[j]) && (inputArr[j].length > 2)) {
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
  function handleSubmit(event) {
    console.log('handlesubmit');
    event.preventDefault(); 
    var petitionData = {
      realText: inputRef.current.value,
      poem: findPoem(poems, inputRef.current.value),
      likes: [],
      dislikes: [],
      category: 'all',
      date: getCurrentDate(),
      imgLink: 'https://images.unsplash.com/photo-1518118573785-ce95d300a48a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      author: user.name
    };
    
    var newPetitionKey = firebase.database().ref().child('petition').push().key;
  
    var updates = {};
    updates['/petitions/' + newPetitionKey] = petitionData;
    setTimeout(() => history.push('/'), 1000)
    return firebase.database().ref().update(updates); 
  }

  function translate() {
    const poem = findPoem(poems, inputRef.current.value);
    setTitle(poem.title);
    setText(poem.text);
    setisDisabled(false);
  }

  function getCurrentDate() {
    let today = (new Date);
    let metka = today.getTime();
    return metka
}


function getMaxLength() {
  let maxStrLength = 0;
  for (let i = 0; i < poems.length; i++) {
    const strArr = poems[i].text.split('\n');
    for (let j = 0; j < strArr.length; j++) {
      if (strArr[j].length > maxStrLength) {
        maxStrLength = strArr[j].length;
        console.log(strArr[j], i);
      }
    }
  }
  console.log(maxStrLength);
}

//getMaxLength();

  return (
    <section className="add-new">
      <div className="add-new__image"/>
      <form className="add-new__form" onSubmit={handleSubmit}>
        <input className="add-new__input" type="text" ref={inputRef}/>
        <h3 className="add-new__poem-title">{title}</h3>
        <p className="add-new__poem-text">{text}</p>
        <div className="add-new__btns-wrapper">
          <button type="button" className="petition-form__submit-btn" onClick={translate}>Перевести</button>
          <button type="submit" disabled={isDisabled}>Опубликовать</button>
        </div>
      </form>
    </section>
  );
}

export default AddNew; 
