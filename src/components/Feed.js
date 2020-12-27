import React from 'react';
import Categories from './Categories';
import Petitions from './Petitions';
import { categoriesMobileData } from '../utils/categories';
import classNames from 'classnames'


function Feed({petitions, showDate}) {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [isMobileCategoriesOpened, setisMobileCategoriesOpened] = React.useState(false);
  const catigoriesMobileContainerSelectors = classNames (
    'catigories__mobile-container',
    {
      'catigories__mobile-container_opened': isMobileCategoriesOpened
    }
  )

  function toggleCategories() {
    setisMobileCategoriesOpened(!isMobileCategoriesOpened);
  }
  
  return (
    <>  
      <div className={catigoriesMobileContainerSelectors}>
        <button className="categories__popup-btn" onClick={toggleCategories}>Темы</button>
        <span className="categories__selected">{categoriesMobileData[selectedCategory]}</span>
        <Categories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} place={'feed-mobile'}/>
      </div>
      <Categories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} place={'feed'}/>
      <Petitions petitions={petitions} showDate={showDate} selectedCategory={selectedCategory}/>
    </>
  );
}

export default Feed; 
