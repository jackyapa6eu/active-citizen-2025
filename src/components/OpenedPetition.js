import React from 'react';
import {
  useHistory
} from "react-router-dom";
import { useParams } from 'react-router';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import UserContext from '../contexts/UserContext';


function OpenedPetition({showDate}) {
  const { pId } = useParams();
  const user = React.useContext(UserContext);
  const history = useHistory();
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
      obj.dislikes ? setDisLikes(obj.dislikes) : setDisLikes([]);
    }); 
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleLikeClick() {
    if (!user.uid) {
      console.log('ВЫ НЕЗАЛОГИНЕНЫ');
      return history.push('/user/sign-in')
    }
    if (likes.includes(user.uid)) { // лайкал?
      console.log('лайкал, удаляем лайк');
      const newLikesArr = likes.filter(el => el !== user.uid); 
      setLikes(newLikesArr); // удаляем лайк
      firebaseReactionHandler('/likes', newLikesArr);
    } else if (disLikes.includes(user.uid)) { // дизлайкал?
      console.log('не лайкал и дизлайкал. убираем дизлайк. ставим лайк');
      const newDisLikesArr = disLikes.filter(el => el !== user.uid); 
      setDisLikes(newDisLikesArr); // удаляем дислайк
      firebaseReactionHandler('/dislikes', newDisLikesArr);
      const newLikesArr = [...likes, user.uid]; //ставим лайк
      setLikes(newLikesArr);
      firebaseReactionHandler('/likes', newLikesArr);
    } else {
      const newLikesArr = [...likes, user.uid]; //ставим лайк
      setLikes(newLikesArr);
      firebaseReactionHandler('/likes', newLikesArr);
      console.log('ставим лайк')
    }
  }

  function handleDislikeLikeClick() {
    if (!user.uid) {
      console.log('ВЫ НЕЗАЛОГИНЕНЫ');
      return history.push('/user/sign-in')
    }
    if (disLikes.includes(user.uid)) { // лайкал?
      console.log('дислайкал, удаляем дислайк');
      const newDisLikesArr = disLikes.filter(el => el !== user.uid); 
      setDisLikes(newDisLikesArr); // удаляем дислайк
      firebaseReactionHandler('/dislikes', newDisLikesArr);
    } else if (likes.includes(user.uid)) { // лайкал?
      console.log('не лайкал и дизлайкал. убираем лайк. ставим дислайк');
      const newLikesArr = likes.filter(el => el !== user.uid); 
      setLikes(newLikesArr); // удаляем лайк
      firebaseReactionHandler('/likes', newLikesArr);
      const newDisLikesArr = [...disLikes, user.uid]; //ставим лайк
      setDisLikes(newDisLikesArr);
      firebaseReactionHandler('/dislikes', newDisLikesArr);
    } else {
      const newDisLikesArr = [...disLikes, user.uid]; //ставим лайк
      setDisLikes(newDisLikesArr);
      console.log('ставим дислайк');
      firebaseReactionHandler('/dislikes', newDisLikesArr);
    }
  }

  function firebaseReactionHandler(path, reactionArr) {
    var updates = {};
    updates['/petitions/' + pId + path] = reactionArr;
    return firebase.database().ref().update(updates);    
  }

  return (
    <article className={`opened-petition opened-petition_type_${category}`}>
      <div className="opened-petition__container">
        <div className="opened-petition__container opened-petition__container_left">
          <h3 className="opened-petition__title">{title}</h3>
          <p className="opened-petition__text">{text}</p>
        </div>
        <div className="opened-petition__container opened-petition__container_right">
          <p className="opened-petition__date">{date}</p>
          <p className="opened-petition__author">{author}</p>
        </div>
      </div>
      <div className="opened-petition__image" style={{backgroundImage: 'url(' + imgUrl + ')',}}></div>
    </article>
  );
}

export default OpenedPetition; 
