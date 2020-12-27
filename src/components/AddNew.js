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
import { categoriesMobileData } from '../utils/categories';
import AddNewOverlay from './AddNewOverlay';

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
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [areYouSure, setAreYouSure] = React.useState(false);
  const [areYouSurePopup, setAreYouSurePopup] = React.useState(false);
  const [isMobileCategoriesOpened, setisMobileCategoriesOpened] = React.useState(false);

  const catigoriesMobileContainerSelectors = classNames (
    'catigories__mobile-container',
    'categories__mobile-container_place_add-new',
    {
      'catigories__mobile-container_opened': isMobileCategoriesOpened
    }
  )

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

  function toggleCategories() {
    setisMobileCategoriesOpened(!isMobileCategoriesOpened);
  }

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
    if (areYouSure) {
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
      setIsSuccess(true);
      setTimeout(() => history.push('/'), 2000)
      return firebase.database().ref().update(updates); 
    } else {
      setAreYouSurePopup(true);
    }

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
    if (
      text === '' || 
      title === '' || 
      inputRef.current.value.length < 3 || 
      !regExp.test(newPetitionImg) || 
      selectedCategory === 'all'
    ) {
      setisDisabled(true);
    } else {
      setisDisabled(false);
    }
  }

  function handleClearBtn() {
    setTitle('');
    setText('');
    inputRef.current.value = '';
  }

  return (
    <section className="add-new">
      <AddNewOverlay 
        isSuccess={isSuccess} 
        setAreYouSure={setAreYouSure} 
        areYouSurePopup={areYouSurePopup}
        setAreYouSurePopup={setAreYouSurePopup}
      />
      <form className="add-new__form" onSubmit={handleSubmit}>
        <div className="add-new__categories-container">
          <p className="add-new__select-cat">Выберите категорию публикации</p>
          <Categories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} place={'add-new'}/>
        </div>
        <div className={catigoriesMobileContainerSelectors}>
          <span className="categories__popup-btn" onClick={toggleCategories}>Темы</span>
          <span className="categories__selected">{categoriesMobileData[selectedCategory]}</span>
          <Categories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} place={'feed-mobile'}/>
        </div>
        <label className={addNewImageSelectors} style={{backgroundImage: 'url(' + newPetitionImg + ')',}}>
          <input className="add-new__file-input" type="file" id="file" ref={fileInputRef} onChange={previewFiles}/>
          <p className="add-new__image-text">Изображение публикации</p>
        </label>
        <label className="add-new__input-wrapper">
          <div className="add-new__clear-btn" onClick={handleClearBtn}/>
          <div className="add-new__translate-btn-small" onClick={translate}/>
          <textarea className="add-new__input" placeholder="Введите свой запрос" ref={inputRef} required onChange={checkPetitionData}></textarea>
        </label>
        <article className="add-new__poem">
          <h3 className="add-new__poem-title">{title}</h3>
          <p className="add-new__poem-text">{text}</p>
        </article>
        <button className="button button_withborder add-new__button add-new__button_translate" type="button" onClick={translate}>Перевести</button>
        <div className="add-new__container">
          <p className="add-new__text-button">Если перевод текста и вид фотографии вас устраивает, нажмите «Опубликовать». Или повторите процедуру.</p>
          <button className={buttonSelectors} type="submit" disabled={isDisabled}>Опубликовать</button>
        </div>
      </form>
    </section>
  );
}

export default AddNew; 
