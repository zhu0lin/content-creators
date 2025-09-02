import React, { useState } from 'react';
import { supabase } from '../client';
import { seedDatabase, sampleCreators } from '../seedData';

const SeedDatabase = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    if (window.confirm('This will clear all existing creators and add sample data. Continue?')) {
      setIsSeeding(true);
      setMessage('Seeding database...');
      
      try {
        await seedDatabase(supabase);
        setMessage('Database seeded successfully! Refresh the page to see the new creators.');
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setIsSeeding(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2>Database Seeding</h2>
          <p>This tool will populate your database with {sampleCreators.length} sample content creators.</p>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>Sample creators to be added:</strong>
            <ul>
              {sampleCreators.map((creator, index) => (
                <li key={index}>{creator.name}</li>
              ))}
            </ul>
          </div>

          <button 
            onClick={handleSeed}
            disabled={isSeeding}
            className="button"
          >
            {isSeeding ? 'Seeding...' : 'Seed Database'}
          </button>

          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : ''}`} style={{ marginTop: '1rem' }}>
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeedDatabase;
