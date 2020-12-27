import React from 'react';
import warningImg from '../styles/images/add-new__are-you-sure-image.svg'

function AddNewAreYouSurePopup({setAreYouSure, setAreYouSurePopup}) {
  function handleCanselBtn() {
    setAreYouSurePopup(false);
  }
  function handleOkBtn() {
    setAreYouSure(true);
    setAreYouSurePopup(false);
  }
  return (
    <div className='add-new__are-you-sure-popup'>
      <img className='add-new__are-you-sure-image' src={warningImg}/>
      <p className='add-new__are-you-sure-text'>{`Эту публикацию больше нельзя будет\n отредактировать или удалить. Продолжить?`}</p>
      <div className='add-new__are-you-sure-btns'>
        <button className='button button_withborder button_place_are-you-sure' onClick={handleCanselBtn}>Нет</button> 
        <button className='button button_place_are-you-sure' onClick={handleOkBtn}>Продолжить</button>
      </div>
    </div>
  )
}

export default AddNewAreYouSurePopup; 