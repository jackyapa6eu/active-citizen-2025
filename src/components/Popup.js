import React from 'react';
import UserContext from '../contexts/UserContext';

function Popup({text}) {
  const user = React.useContext(UserContext);
  return (
    <div className='popup'>
      <h4 className='popup__text'>{`Гражданин-поэт\n${user.name} ${user.secondName},\n ${text}`}</h4>
      <svg className='popup__image' xmlns="http://www.w3.org/2000/svg" width="100" height="76" viewBox="0 0 100 76" fill="none">
        <path d="M31.7794 59.9612L8.07277 36.3281L0 44.3192L31.7794 76L100 7.99105L91.9841 0L31.7794 59.9612Z" fill="#FDFDFD"/>
      </svg>
    </div>
  )
}

  



export default Popup; 
