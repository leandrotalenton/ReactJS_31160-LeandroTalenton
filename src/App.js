/* import logo from './logo.svg'; */
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CartWidget from './components/CartWidget';
import ItemListContainer from './components/ItemListContainer';
import ItemList from './components/ItemList';

function App() {
  return (
    <>
      <NavBar>
        <CartWidget/>
      </NavBar>
      <Hero/>
      <ItemListContainer>
        <ItemList/>
      </ItemListContainer>
      <Footer/>
    </>
  );
}

export default App;
