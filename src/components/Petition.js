import React from 'react';

function Petition({petition}) {
  return (
        <div className="petitions__item">
          <h3 className="petitions__title">{petition.poem.fields.name}</h3>
          <p>Пользователь ввел:</p>
          <p className="petitions__text">{petition.realText}</p>
          <p>Стих (первые 15 строчек):</p>
          <p className="petitions__text">{petition.poem.fields.text}</p>
        </div>
        )
}

export default Petition; 