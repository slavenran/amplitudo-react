import React from 'react';
import './App.css';
import LayoutComponent from './components/layout/LayoutComponent';
import RefreshContext from './context/RefreshTableContext';
import WidthContext from './context/WidthContext';
import folderTree from './initialData/folderTree.json';
import documentList from './initialData/documentList.json';
import setFileMaxId from './functions/fileMaxId';

function App() {
  if (!(localStorage.getItem('folderTree') || localStorage.getItem('documentList'))) {
    localStorage.setItem('folderTree', JSON.stringify(folderTree));
    localStorage.setItem('documentList', JSON.stringify(documentList));
  }

  // get max id currently in local storage
  const docList = JSON.parse(localStorage.getItem('documentList'));
  setFileMaxId(docList[docList.length-1].id);

  return <div className="App">
    <RefreshContext>
      <WidthContext>
        <LayoutComponent />
      </WidthContext>
    </RefreshContext>
  </div>
}

export default App;
