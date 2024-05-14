// 在React组件中
import React, { useState, useEffect } from 'react';
 
function Country() {
  const [data, setData] = useState(null);
 
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);
 
  return (
    <div>
      {data ? <h1>Data: {data}</h1> : <h1>Loading...</h1>}
    </div>
  );
}
 
export default Country;
