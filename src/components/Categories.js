import React from 'react';
import Category from './Category';

function Categories({setSelectedCategory, selectedCategory}) {
  const categoriesData = [
  { 
    value: 'all',
    text: 'Все',
  },
  { 
    value: 'social',
    text: 'Социум',
  },
  { 
    value: 'culture',
    text: 'Культура',
  },
  { 
    value: 'politics',
    text: 'Политика',
  },
  { 
    value: 'transport',
    text: 'Транспорт',
  }
  ]
  return (
    <ul className="categories">
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
