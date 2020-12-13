import React from 'react';
import poems from '../utils/poems';
import firebase from 'firebase/app';
import "firebase/database";

function PetitionForm() {
  const inputRef = React.useRef();
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
  /*
  function cutPoem(poem) {
    const strArr = poem.split('\n');
    const length = strArr.length > 15 ? 15 : strArr.length;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += `${strArr[i]}\n`
    }
    return result
  }
*/
  function handleSubmit(event) {
    event.preventDefault();
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
    <form className="petition-form" onSubmit={handleSubmit}>
      <input className="petition-form__input" type="text" ref={inputRef}/>
      <button type="submit" className="petition-form__submit-btn">Найти</button>
  </form>
  );
}

export default PetitionForm; 
