import React from 'react';
import './App.css';
import LayoutComponent from './components/layout/LayoutComponent';
import RefreshData from './context/RefreshData';

function App() {
  return (
    <div className="App">
      <RefreshData>
        <LayoutComponent />
      </RefreshData>
    </div>
  );
}

export default App;
