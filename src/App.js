import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Countries from './components/Countries';
import DetailsPage from './components/DetailsPage'; // asegúrate de importar DetailsPage

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/countries/:continent" element={<Countries />} />
          <Route path="/country/:name" element={<DetailsPage />} />
          <Route path="/details/1" element={<DetailsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;