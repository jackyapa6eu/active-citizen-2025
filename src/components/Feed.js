import React from 'react';
import Categories from './Categories';
import Petitions from './Petitions';


function Feed({petitions, showDate}) {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  return (
    <>
      <Categories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} place={'feed'}/>
      <Petitions petitions={petitions} showDate={showDate} selectedCategory={selectedCategory}/>
    </>
  );
}

export default Feed; 
