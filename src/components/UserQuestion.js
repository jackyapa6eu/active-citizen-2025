import React from 'react';
import { Link } from "react-router-dom";
const UserQuestion = ({question, path, linkText}) => 
  <span className="user__question">{question} 
      <Link to={path} className="user__link">{linkText}</Link>
  </span>
  

export default UserQuestion; 
