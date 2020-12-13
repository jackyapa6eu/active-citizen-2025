import React from 'react';
import petitionImage from '../styles/images/image1.png';
import {
  useHistory
} from "react-router-dom";

function Petition({petition}) {
  const history = useHistory();
  function openPetition() {
    history.push("/opened-petition");
  }
  return (
        <div className="petitions__item" onClick={openPetition}>
          <div className="petitions__container petitions__container_title">
            <h3 className="petitions__title">{petition.poem.fields.name}</h3>
            <p className="petitions__data">12 декабря 2020</p>
          </div>
          <div className="petitions__container petitions__container_rating">
            <div className="flex">
              <button className="btn btn_like"></button>
              <p className="petitions__rating">1024</p>
            </div>
            <div className="flex">
              <button className="btn btn_dislike"></button>
              <p className="petitions__rating">362</p>
            </div>
          </div>
          <img src={petitionImage} alt="" className="petitions__image"/>
        </div>
        )
}

export default Petition; 