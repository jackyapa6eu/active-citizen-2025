import React from 'react';
import Category from './Category';

function Categories({setSelectedCategory, selectedCategory}) {
  const categoriesData = [
  { 
    value: 'all',
    text: 'Все',
  },
  { 
    value: 'culture',
    text: 'Культура',
  },
  { 
    value: 'homeland',
    text: 'Родина',
  },
  { 
    value: 'history',
    text: 'История',
  },
  { 
    value: 'science',
    text: 'Наука',
  },
  { 
    value: 'nature',
    text: 'Природа',
  },
  { 
    value: 'family',
    text: 'Семья',
  },
  { 
    value: 'relationship',
    text: 'Отношения',
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
