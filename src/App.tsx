import React from 'react';
import Converter from './components/Converter'
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Converter />
      </header>
    </div>
  );
}

export default App;
