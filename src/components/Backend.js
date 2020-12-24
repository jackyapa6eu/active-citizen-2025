import React from 'react';

function BackEnd() {
  const req = {
    "string": "аптека улица фонарь"
  }
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
  }

  function status(response) {  
    if (response.status >= 200 && response.status < 300) {  
      return Promise.resolve(response)  
    } else {  
      return Promise.reject(new Error(response.statusText))  
    }  
  }
  
  function json(response) {  
    return response.json()  
  }
  


  React.useEffect(() => { /*
    fetch('https://active-citizen-backend.herokuapp.com/', options)  
    .then(status)  
    .then(json)  
    .then(function(data) {  
      console.log('Request succeeded with JSON response', data);  
    }).catch(function(error) {  
      console.log('Request failed', error);  
    }); */
  }, [])

  return (
    <section className="backend">
      <p className="backend__text">
        BackEnd
      </p>
    </section>
  );
}

export default BackEnd; 
