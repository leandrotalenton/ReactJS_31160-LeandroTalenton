/* import logo from './logo.svg'; */
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CartWidget from './components/CartWidget';
import ItemListContainer from './components/ItemListContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {
  return (
    <>
    <BrowserRouter>
      <NavBar>
        <CartWidget/>
      </NavBar>
      <Routes>
        <Route path='/' element={
          <>
            <Hero/>
            <ItemListContainer/>
          </>
        } />
        <Route path='/item/:itemId' element={<ItemDetailContainer />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
