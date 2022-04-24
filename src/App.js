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
        <Card name='zapatilla 1' price='21' />
        <Card name='zapatilla 2' price='22' />
        <Card name='zapatilla 3' price='23' />
        <Card name='zapatilla 4' price='24' />
        <Card name='zapatilla 5' price='25' />
      </ItemListContainer>
      <Footer/>
    </>
  );
}

export default App;
