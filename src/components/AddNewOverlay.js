import React from 'react';
import AddNewSuccessPopup from './AddNewSuccessPopup';
import AddNewAreYouSurePopup from './AddNewAreYouSurePopup';
import classNames from 'classnames';

function AddNewOverlay({isSuccess, setAreYouSure, areYouSurePopup, setAreYouSurePopup}) {
  const addNewOverlaySelectors = classNames (
    'add-new__overlay',
    {
      'add-new__overlay_opened': isSuccess || areYouSurePopup
    }
  )
  return (
    <div className={addNewOverlaySelectors}>
      {isSuccess && <AddNewSuccessPopup/>}
      {areYouSurePopup && <AddNewAreYouSurePopup setAreYouSure={setAreYouSure} setAreYouSurePopup={setAreYouSurePopup}/>}
    </div>
  )
}

export default AddNewOverlay; 