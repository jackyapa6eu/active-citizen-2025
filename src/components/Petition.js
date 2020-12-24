import React from 'react';
import {
  useHistory
} from "react-router-dom";

function Petition({petition, showDate}) {
  const history = useHistory();
  const [likes, setLikes] = React.useState([]);
  const [disLikes, setDisLikes] = React.useState([]);
  React.useEffect(() => {
    petition.likes ? setLikes(petition.likes) : setLikes([]);
    petition.dislikes ? setDisLikes(petition.dislikes) : setDisLikes([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function openPetition() {
    history.push(`/petitions/${petition.id}`);
  }
  return (
        <div className={`petitions__item petitions__item_type_${petition.category}`} onClick={openPetition}>
          <div className="petitions__container petitions__container_title">
            <h3 className="petitions__title">{petition.poem.title}</h3>
            <div className="petitions__container petitions__container_rating">
              <div className="flex">
                <button className="btn btn_like"></button>
                <p className="petitions__rating">{likes.length}</p>
              </div>
              <div className="flex">
                <button className="btn btn_dislike"></button>
                <p className="petitions__rating">{disLikes.length}</p>
              </div>
            </div>
            <span className="petitions__data">{showDate(petition.date)}</span>
          </div>
          <img src={petition.imgLink} alt="" className="petitions__image"/>
        </div>
        )
}

export default Petition; 