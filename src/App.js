/* import logo from './logo.svg'; */
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ItemListContainer from './components/ItemListContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer';
import CartContextProvider from './components/context/CartContext';
import AppContextProvider from './components/context/AppContext';
import Cart from './components/Cart';

function App() {
  return (
    <AppContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<>
              <Hero />
              <ItemListContainer />
            </>} />
            <Route path='/category/:categoryId' element={<ItemListContainer />} />
            <Route path='/item/:itemId' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartContextProvider>
    </AppContextProvider>
  );
}

export default App;
