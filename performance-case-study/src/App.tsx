import React from 'react';

import Carousel from './Carousel/Carousel';

import './App.css';

const availableItems = [...(new Array(12)).keys()].map(i => {return {title: `item_${i}`}})

function App() {
  return (
    <div className="App">
      <Carousel title='My Items' items={availableItems}/>
    </div>  
  );
}

export default App;
