import React from 'react';

function OpenedPetition() {
  return (
    <article className="opened-petition">
      <div className="opened-petition__info">
        <h3 className="opened-petition__title">
          {'Мизиз...\nЗынь...\nИцив - \nЗима!..'}
        </h3>
        <span className="opened-petition__date">
          07 декабря 2020
        </span>
      </div>
      <p className="opened-petition__text">
        {'Мизиз... \nЗынь... \nИцив - Зима!.. \nЗамороженные \nСтень Стынь... \nСнегота... Снегота!..\nСтужа... вьюжа... \nВью-ю-ю-га - сту-у-у-га...'}
      </p>
      <div className="opened-petition__image">
        <div className="opened-petition__reactions">
          <button type="button" className="opened-petition__reactions-item">2454</button>
          <button type="button" className="opened-petition__reactions-item">1454</button>
        </div>
      </div>
      <span className="opened-petition__author">ID#222222</span>
    </article>
  );
}

export default OpenedPetition; 
