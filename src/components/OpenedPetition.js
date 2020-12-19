import React from 'react';
import { useParams } from 'react-router';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import UserContext from '../contexts/UserContext';
import imageCurcle from '../styles/images/ellipse.png';


function OpenedPetition({showDate}) {
  const { pId } = useParams();
  const user = React.useContext(UserContext);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [likes, setLikes] = React.useState([]);
  const [disLikes, setDisLikes] = React.useState([]);
  const [imgUrl, setImgUrl] = React.useState('');
  const [date, setDate] = React.useState('');
  const [category, setCategory] = React.useState('');
  React.useEffect(() => { 
    const cheatSheetRef = firebase.database().ref('petitions/' + pId);
    cheatSheetRef.once('value', (snapshot) => {
      if (snapshot.val() === null) {
        //setSetNotFound(true);
        //hideLoader();
        return
      }
      const obj = snapshot.val();
      setText(obj.poem.text);
      setTitle(obj.poem.title);
      setAuthor(obj.author);
      setImgUrl(obj.imgLink);
      setDate(showDate(obj.date));
      setCategory(obj.category);
      obj.likes ? setLikes(obj.likes) : setLikes([]);
      obj.disLikes ? setDisLikes(obj.disLikes) : setDisLikes([]);
    }); 
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  

  return (
    <article className={`opened-petition opened-petition_type_${category}`}>
      <img className="opened-petition__curcle"src={imageCurcle} alt=""/>
      <div className="opened-petition__info">
        <h3 className="opened-petition__title">
          {title}
        </h3>
        <span className="opened-petition__date">
          {date}
        </span>
      </div>
      <p className="opened-petition__text">
        {text}
      </p>
      <div className="opened-petition__image" style={{backgroundImage: 'url(' + imgUrl + ')',}}>
        <div className="opened-petition__reactions">
          <button type="button" className="opened-petition__reactions-item">{likes.length}</button>
          <button type="button" className="opened-petition__reactions-item">{disLikes.length}</button>
        </div>
      </div>
      <span className="opened-petition__author">{author}</span>
    </article>
  );
}

export default OpenedPetition; 
