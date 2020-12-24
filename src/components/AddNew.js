import React from 'react';
import poems from '../utils/poems';
import firebase from 'firebase/app';
import "firebase/database";
import "firebase/storage";
import UserContext from '../contexts/UserContext';
import Categories from './Categories';
import {
  useHistory
} from "react-router-dom";
import classNames from 'classnames';

function AddNew() {
  const user = React.useContext(UserContext);
  const inputRef = React.useRef();
  const fileInputRef = React.useRef();
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [isDisabled, setisDisabled] = React.useState(true);
  const [newPetitionKey, setNewPetitionKey] = React.useState('');
  const [newPetitionImg, setNewPetitionImg] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const history = useHistory();

  const buttonSelectors = classNames(
    'button add-new__button add-new__button_publish',
    {
      'button_disabled': isDisabled
    }
  )

  const addNewImageSelectors = classNames(
    'add-new__image',
    {
      'add-new__image_loaded': newPetitionImg !== '',
    }
  )

  React.useEffect(() => {
    setNewPetitionKey(firebase.database().ref().child('petition').push().key);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    checkPetitionData();
  }, [title, text, newPetitionImg, selectedCategory]); // eslint-disable-line react-hooks/exhaustive-deps

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
    event.preventDefault(); 
    var petitionData = {
      realText: inputRef.current.value,
      poem: findPoem(poems, inputRef.current.value),
      likes: [],
      dislikes: [],
      category: selectedCategory,
      date: getCurrentDate(),
      imgLink: newPetitionImg,
      author: user.name
    };

    var updates = {};
    updates['/petitions/' + newPetitionKey] = petitionData;
    setTimeout(() => history.push('/'), 1000)
    return firebase.database().ref().update(updates); 
  }

  function translate() {
    const poem = findPoem(poems, inputRef.current.value);
    setTitle(poem.title);
    setText(poem.text);
  }

  function getCurrentDate() {
    let today = (new Date);
    let metka = today.getTime();
    return metka
}
  function previewFiles() {
    if (fileInputRef.current.files.length === 0) {
      setNewPetitionImg('');
      return
    }
    const storageRef = firebase.storage().ref();
    let file = fileInputRef.current.files[0];
    let name = newPetitionKey;
    storageRef.child(name).put(file).then(function(snapshot) {
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
            setNewPetitionImg(downloadURL);
        })
    }); 
  }

  function checkPetitionData() {
    const regExp = /https?:\/\/w{0,3}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*#?/gi;
    if (text === '' || title === '' || inputRef.current.value.length < 3 || !regExp.test(newPetitionImg) || selectedCategory === 'all') {
      setisDisabled(true);
    } else {
      setisDisabled(false);
    }
  }
/*
function getMaxLength() {
  let maxStrLength = 0;
  let moreThenFifty = 0;
  let moreThenSixty = 0;
  let moreThenSeventy = 0;
  let moreThenEighty = 0;
  let moreThenNinety = 0;
  for (let i = 0; i < poems.length; i++) {
    const strArr = poems[i].text.split('\n');
    for (let j = 0; j < strArr.length; j++) {

      if (strArr[j].length > 50) {
        moreThenFifty++;
      }
      if (strArr[j].length > 60) {
        moreThenSixty++;
      }
      if (strArr[j].length > 70) {
        moreThenSeventy++;
      }
      if (strArr[j].length > 80) {
        moreThenEighty++;
      }
      if (strArr[j].length > 90) {
        moreThenNinety++;
      }

      if (strArr[j].length > maxStrLength) {
        maxStrLength = strArr[j].length;
        console.log(strArr[j], i);
      }
    }
  }
  console.log(poems.length);
  console.log('Количество строк, длинна которых');
  console.log('>50', moreThenFifty);
  console.log('>60', moreThenSixty);
  console.log('>70', moreThenSeventy);
  console.log('>80', moreThenEighty);
  console.log('>90', moreThenNinety);
}

//getMaxLength();
*/
  return (
    <section className="add-new">
      <form className="add-new__form" onSubmit={handleSubmit}>
        <p className="add-new__select-cat">Выберите категорию публикации</p>
        <Categories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}/>
        <label className={addNewImageSelectors} style={{backgroundImage: 'url(' + newPetitionImg + ')',}}>
          <input className="add-new__file-input" type="file" id="file" ref={fileInputRef} onChange={previewFiles}/>
          <p className="add-new__image-text">Изображение публикации</p>
        </label>
        <textarea className="add-new__input" placeholder="Введите свой запрос" ref={inputRef} required onChange={checkPetitionData}></textarea>
        <p className="add-new__poem-text">{text}</p>
        <button className="button button_withborder add-new__button" type="button" onClick={translate}>Перевести</button>
        <div className="add-new__container">
          <p className="add-new__text-button">Если перевод текста и вид фотографии вас устраивает, нажмите «Опубликовать». Или повторите процедуру.</p>
          <button className={buttonSelectors} type="submit" disabled={isDisabled}>Опубликовать</button>
        </div>
      </form>
    </section>
  );
}

export default AddNew; 
