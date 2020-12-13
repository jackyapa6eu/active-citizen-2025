import React from 'react';
import petitionImage from '../styles/images/image1.png';

function Petition({petition}) {
  return (
        <div className="petitions__item">
          <div class="petitions__container petitions__container_title">
            <h3 className="petitions__title">{petition.poem.fields.name}</h3>
            <p class="petitions__data">12 декабря 2020</p>
          </div>
          <div class="petitions__container petitions__container_rating">
            <div class="flex">
              <button class="btn btn_like"></button>
              <p class="petitions__rating">1024</p>
            </div>
            <div class="flex">
              <button class="btn btn_dislike"></button>
              <p class="petitions__rating">362</p>
            </div>
          </div>
          <img src={petitionImage} alt="" class="petitions__image"/>
        </div>
        )
}

export default Petition; 