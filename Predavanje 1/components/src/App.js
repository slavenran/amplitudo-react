import './App.css';
import NavbarTop from './components/navbarTop/NavbarTop';
import Component1 from './components/styles/component1/Component1';
import Component2 from './components/styles/component2/Component2';
import StyledComponent from './components/styles/styledComponent/StyledComponent';
// import ChildElement from './components/childElement/ChildElement';
// import Counter from './components/counter/Counter';
// import IdCard from './components/idCard/IdCard.jsx';
// import MyImage from './components/myImage/MyImage';
// import ReducerExample from './components/reducerExample/ReducerExample';
// import Table from './components/table/Table';
// import Wrapper from './components/wrapper/Wrapper.jsx';
// import MyData from './context/MyData';
// import {logToConsole, logToConsole2, mapArray} from './functions/examples'
// import { wrapperElements } from './constants/wrapperElements';
// import DebouncedSearch from './components/debouncedSearch/DebouncedSearch';
import Movies from './pages/movies/Movies';

function App() {
  // const array = [1, 2, 3];

  // map, includes, some, find, length, filter

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
      {/* <MyImage src="logo512.png" />
      <Table />
      <Wrapper>
        <IdCard name="Slaven" surname="Ranisavljevic" image={<MyImage src="logo192.png"/>}/>
        <IdCard name="Memanja" surname="Kukavac" image={<MyImage src="logo512.png"/>}/>
        <IdCard name="Nino" surname="Ninic" city="HN" image={<MyImage src="logo192.png"/>}/>
      </Wrapper>
      <Wrapper children={
        <>
          <IdCard name="ASDASDASD" surname="ASDDSAFDS" image={<Table/>}/>
          <IdCard name="ASADSADS" surname="DFGGF" image="Tekst"/>
          <IdCard name="NiASADSADSno" surname="GHDRFH" city="HN" 
            image={<MyImage src="logo192.png"/>}
            childElement={ChildElement}
            onClick={() => mapArray(array)}/>
        </>
      }/> */}
      {/* <Wrapper title="Surname equals Ninic 1">
        {
          wrapperElements.map(item => {
            if (item.surname === "Ninic 1") {
              return <IdCard name={item.name} 
                            surname={item.surname} 
                            city={item.city}  
                            image={item.image} 
                            childElement={item.childElement} 
                            onClick={item.onClick} />
            } else {
              return <></>
            }
          })
        }
      </Wrapper> */}
      {/* <MyData.Provider value={{data: wrapperElements, name: 'Smrdo'}}>
        <Counter initialCount={0}/>
        <ReducerExample/>
        <DebouncedSearch/>
      </MyData.Provider> */}

      <NavbarTop/>
      <Component1 className="some-class" hasClass/>
      <Component1 className="some-class"/>
      <Component2 />
      <StyledComponent/>
      <StyledComponent backgroundColor="yellow"/>

      <Movies/>
    </div>
  );
}

export default App;
