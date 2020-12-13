import React from 'react';
import Petition from './Petition';

function Petitions({petitions}) {
  return (
    <div className="petitions">
      {petitions.map((petition) => {
        return(<Petition key={petition.id} petition={petition} />)
      })}
    </div>
  );
}

export default Petitions; 
