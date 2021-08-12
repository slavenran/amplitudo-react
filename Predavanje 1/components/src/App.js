import './App.css';
import IdCard from './components/idCard/IdCard.';
import MyImage from './components/myImage/MyImage';
import Table from './components/table/Table';
import Wrapper from './components/wrapper/Wrapper.jsx';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <FuncComponent />
      </header> */}
      <MyImage />
      <Table />
      <Wrapper>
        <IdCard name="Slaven" surname="Ranisavljevic" src="logo192.png"/>
        <IdCard name="Memanja" surname="Kukavac" src="logo512.png"/>
        <IdCard name="Nino" surname="Ninic" city="HN" src="logo192.png"/>
      </Wrapper>
      <Wrapper children={
        <>
          <IdCard name="ASDASDASD" surname="ASDDSAFDS" src="logo192.png"/>
          <IdCard name="ASADSADS" surname="DFGGF" src="logo512.png"/>
          <IdCard name="NiASADSADSno" surname="GHDRFH" city="HN" src="logo192.png"/>
        </>
      }/>
    </div>
  );
}

export default App;
