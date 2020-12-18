import React from 'react';
import Petition from './Petition';

function Petitions({petitions, showDate}) {
  return (
    <div className="petitions">
      {petitions.map((petition) => {
        return(<Petition key={petition.id} petition={petition} showDate={showDate}/>)
      })}
    </div>
  );
}

export default Petitions; 
