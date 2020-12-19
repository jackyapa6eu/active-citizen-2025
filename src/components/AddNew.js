import React from 'react';
import poems from '../utils/poems';
import firebase from 'firebase/app';
import "firebase/database";
import UserContext from '../contexts/UserContext';
import addImageButton from '../styles/images/add-new__image-btn.svg';
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
      <h2 className="add-new__title">Как разместить публикацию через портал ГРАЖДАНИН-ПОЭТ:</h2>
      <ol className="add-new__direction">
        <li className="add-new__item">Выберите наиболее подходящую к вашей публикации категорию из списка.</li>
        <li className="add-new__item">Коротко опишите суть своей публикации. Нажмите&nbsp;“Перевести”, чтобы увидеть ваш текст на языке поэзии.</li>
        <li className="add-new__item">Чтобы добавить фото, нажмите на <img className="add-new__item-image" src={addImageButton} alt="#"></img> Фото&nbsp;пройдёт&nbsp;моментальную модерацию.</li>
        <li className="add-new__item">Если перевод текста и вид фотографии вас устраивает, нажмите «Опубликовать». Или повторите процедуру.</li>
      </ol>

      <form className="add-new__form" onSubmit={handleSubmit}>
        <input className="add-new__input" type="text" placeholder="Введите свой запрос" ref={inputRef} required />
        <h3 className="add-new__poem-title">{title}</h3>
        <div className="add-new__image">
          <p className="add-new__image-text">Изображение публикации</p>
        </div>
        <p className="add-new__poem-text">{text}</p>
        <button className="button button_withborder" type="button" onClick={translate}>Перевести</button>
        <button className="button" type="submit" disabled={isDisabled}>Разместить</button>
      </form>
    </section>
  );
}

export default AddNew; 
