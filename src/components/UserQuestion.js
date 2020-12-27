import React from 'react';
import { Link } from "react-router-dom";
const UserQuestion = ({question, path, linkText, place}) => 
  <span className={`user__question user__question_place_${place}`}>{question} 
      <Link to={path} className="user__link">{linkText}</Link>
  </span>
  

export default UserQuestion; 
