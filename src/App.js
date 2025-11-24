import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Firm from './components/Firm';
import Why from './components/Why';
import Approach from './components/Approach';
import Portfolio1 from './components/Portfolio1';
import Portfolio2 from './components/Portfolio2';
import Values from './components/Values';
import Team from './components/Team';
import Value2 from './components/Value2';
import History from './components/History';
import Responsibility from './components/Responsibility';
import Title from './components/Title';
import Partners from './components/Partners';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Landing from './components/Landing';
import PortfolioPage from './components/PortfolioPage';
import CompanyPage from './components/Company';
import Login from './components/Login';
import Placeholder from './components/Placeholder';

// Home page component with all sections
function Home() {
  return (
    <>
      <Landing />
      <Firm />
      <Why />
      <Approach />
      <Portfolio1 />
      <Portfolio2 />
      <Values />
      <Team />
      <Value2 />
      <History />
      <Responsibility />
      <Title />
      <Partners />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/investor-portal" element={<Placeholder />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;