/* import logo from './logo.svg'; */
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Card from './components/Card';
import Hero from './components/Hero';

function App() {
  return (
    <>
      <NavBar/>
      <Hero/>
      <div className='container flex flex-wrap justify-center bg-300 mx-auto my-4'>
        <Card name='zapatilla 1' price='21' />
        <Card name='zapatilla 2' price='22' />
        <Card name='zapatilla 3' price='23' />
        <Card name='zapatilla 4' price='24' />
        <Card name='zapatilla 5' price='25' />
      </div>
      <Footer/>
    </>
  );
}

export default App;
