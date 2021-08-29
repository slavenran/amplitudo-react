import React from 'react';
import './App.css';
import LayoutComponent from './components/layout/LayoutComponent';
import RefreshData from './context/RefreshData';
import folderTree from './initialData/folderTree.json';
import documentList from './initialData/documentList.json';

function App() {
  if (!(localStorage.getItem('folderTree') || localStorage.getItem('documentList'))) {
    localStorage.setItem('folderTree', JSON.stringify(folderTree));
    localStorage.setItem('documentList', JSON.stringify(documentList));
  }

  return <div className="App">
    <RefreshData>
      <LayoutComponent />
    </RefreshData>
  </div>
}

export default App;
