import React from 'react';
import logoDark from '../styles/images/logo-dark.png';

function Footer() {

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="logo__container logo__container_footer">
          <img src={logoDark} alt="гражданин-поэт" className="logo__image" />
          <h2 className="logo__title footer__title">гражданин-поэт</h2>
        </div>
        <p className="footer__subtitle">Первое сообщество для перевода ваших текстов на язык классической поэзии.</p>
        <ul className="footer__lists">
          <li className="footer__list footer__list_title">Команда:</li>
          <li className="footer__list">Евгений Денисов</li>
          <li className="footer__list">Александр Распертов</li>
          <li className="footer__list">Виктория Велимирова</li>
        </ul>
        <hr className="footer__line" />
        <span className="footer__creators">Хакатон Яндекс.Практикума, 2020&nbsp;г.</span>
      </div>
    </footer>
  );
}

export default Footer; 
