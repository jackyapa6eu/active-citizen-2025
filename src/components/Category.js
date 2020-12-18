import React from 'react';
import classNames from 'classnames';

function Category({value, text, setSelectedCategory, selectedCategory}) {
  function selectCategory() {
    setSelectedCategory(value);
  }
  const categorySelector = classNames(
    'categories__item',
    `categories__item_content_${value}`,
    {
      'categories__item_active': value === selectedCategory
    }
  )
  return (
    <li className={categorySelector} onClick={selectCategory}>{text}</li>
  );
}

export default Category; 
