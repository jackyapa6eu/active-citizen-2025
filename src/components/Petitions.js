import React from 'react';
import Petition from './Petition';

function Petitions({petitions, showDate, selectedCategory}) {
  return (
    <div className="petitions">
      {petitions.map((petition) => {
        return(
          (selectedCategory === petition.category || selectedCategory === 'all') 
            && <Petition key={petition.id} petition={petition} showDate={showDate}/>
        )
      })}
    </div>
  );
}

export default Petitions; 
