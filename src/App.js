import CodebenderIntro from './CodebenderIntro';
import React from 'react';
import './App.css';

// Importing app components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />

      <div className='container'>
        <p>AI Thumbnail Generator.</p>
        <CodebenderIntro />
      </div>

      <Footer />
    </div>
  );
}

export default App;
