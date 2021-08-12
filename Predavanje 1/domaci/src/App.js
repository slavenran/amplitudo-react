import './App.css';
import Book from './components/book/Book';
import IdCard from './components/idCard/IdCard';
import Movie from './components/movie/Movie';
import Wrapper from './components/wrapper/Wrapper';

function App() {
  return (
    <div className="App">
      <Wrapper>
        <table className="table">
          <tr>
            <th rowSpan="4" style={{ width: "20px", writingMode: 'vertical-rl', textOrientation: 'upright' }}>Licne karte</th>
            <th>Ime i prezime</th>
            <th>Datum rodjenja</th>
            <th>Grad</th>
            <th>Slika</th>
          </tr>
          <IdCard name="Slaven" surname="Ranisavljevic" birthDate="25.03.1998" city="Podgorica" src="logo192.png"/>
          <IdCard name="Slaven" surname="Ranisavljevic" birthDate="25.03.1998" city="Podgorica" src="logo192.png"/>
          <IdCard name="Slaven" surname="Ranisavljevic" birthDate="25.03.1998" city="Podgorica" src="logo192.png"/>
        </table>
        <table className="table">
          <tr>
            <th rowSpan="4" style={{ width: "20px", writingMode: 'vertical-rl', textOrientation: 'upright' }}>Filmovi</th>
            <th>Naziv</th>
            <th>Godina</th>
            <th>Zanr</th>
            <th>Reziser</th>
            <th>Glumci</th>
            <th>Slika</th>
          </tr>
          <Movie title="Deadpool" year="2018" genre="Action, Comedy" director="Idk Know" actors="Ryan Reynolds" src="logo192.png"/>
          <Movie title="Deadpool" year="2018" genre="Action, Comedy" director="Idk Know" actors="Ryan Reynolds" src="logo192.png"/>
          <Movie title="Deadpool" year="2018" genre="Action, Comedy" director="Idk Know" actors="Ryan Reynolds" src="logo192.png"/>
        </table>
        <table className="table">
          <tr>
            <th rowSpan="4" style={{ width: "20px", writingMode: 'vertical-rl', textOrientation: 'upright' }}>Knjige</th>
            <th>Naslov</th>
            <th>Godina izdavanja</th>
            <th>Autor</th>
            <th>Slika</th>
            <th>Citat</th>
          </tr>
          <Book title="Dead Zone" year="2002" author="Stephen King" src="logo192.png" quote="I'm bald, but I don't care"/>
          <Book title="Dead Zone" year="2002" author="Stephen King" src="logo192.png" quote="I'm bald, but I don't care"/>
          <Book title="Dead Zone" year="2002" author="Stephen King" src="logo192.png" quote="I'm bald, but I don't care"/>
        </table>
      </Wrapper>
    </div>
  );
}

export default App;
