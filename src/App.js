import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatorList from './components/CreatorList';
import CreatorDetail from './components/CreatorDetail';
import CreatorForm from './components/CreatorForm';
import SeedDatabase from './components/SeedDatabase';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}>
        <header style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <nav className="container">
            <ul style={{ margin: 0, padding: '1rem 0' }}>
              <li>
                <strong style={{ 
                  color: '#00d4ff',
                  fontSize: '1.5rem',
                  background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Content Creators App
                </strong>
              </li>
            </ul>
            <ul style={{ margin: 0, padding: '1rem 0' }}>
              <li>
                <Link 
                  to="/" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(0, 212, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/creators/new" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(0, 212, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  Add Creator
                </Link>
              </li>
              <li>
                <Link 
                  to="/seed" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(0, 212, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  Seed Database
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<CreatorList />} />
            <Route path="/creators/:id" element={<CreatorDetail />} />
            <Route path="/creators/:id/edit" element={<CreatorForm />} />
            <Route path="/creators/new" element={<CreatorForm />} />
            <Route path="/seed" element={<SeedDatabase />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
