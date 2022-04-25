/* import logo from './logo.svg'; */
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Card from './components/Card';
import Hero from './components/Hero';
import CartWidget from './components/CartWidget';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <>
      <NavBar>
        <CartWidget/>
      </NavBar>
      <Hero/>
      <ItemListContainer>
        <Card name='zapatilla 1' price='21' initial='1' stock='2' />
        <Card name='zapatilla 2' price='22' initial='1' stock='3' />
        <Card name='zapatilla 3' price='23' initial='1' stock='4' />
        <Card name='zapatilla 4' price='24' initial='1' stock='5' />
        <Card name='zapatilla 5' price='25' initial='1' stock='6' />
        <Card name='zapatilla 6' price='26' initial='1' stock='7' />
        <Card name='zapatilla 7' price='27' initial='1' stock='8' />
        <Card name='zapatilla 8' price='28' initial='1' stock='9' />
      </ItemListContainer>
      <Footer/>
    </>
  );
}

export default App;
