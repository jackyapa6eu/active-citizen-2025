import React from 'react';
import Category from './Category';
import {categoriesData} from '../utils/categories.js';
function Categories({setSelectedCategory, selectedCategory, place}) {

  return (
    <ul className={`categories categories_place_${place}`}>
      {categoriesData.map((categoryItem, index) => {
        return (
          <Category 
            value={categoryItem.value} 
            text={categoryItem.text} 
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            key={index}
          />
        )
      })}
  </ul>
  );
}

export default Categories; 
