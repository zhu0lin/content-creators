import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const CreatorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCreator = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${supabase.supabaseUrl}/rest/v1/creators?id=eq.${id}&select=*`, {
        method: 'GET',
        headers: {
          'apikey': supabase.supabaseKey,
          'Authorization': `Bearer ${supabase.supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCreator(data[0] || null); // Supabase returns an array, we want the first item
    } catch (err) {
      setError(err.message);
      console.error('Error fetching creator:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCreator();
    }
  }, [id, fetchCreator]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      try {
        const response = await fetch(`${supabase.supabaseUrl}/rest/v1/creators?id=eq.${id}`, {
          method: 'DELETE',
          headers: {
            'apikey': supabase.supabaseKey,
            'Authorization': `Bearer ${supabase.supabaseKey}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        navigate('/');
      } catch (err) {
        setError(err.message);
        console.error('Error deleting creator:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading creator details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger">
          <p>Error: {error}</p>
          <Link to="/" className="button">Back to Home</Link>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="container">
        <div className="alert">
          <p>Creator not found</p>
          <Link to="/" className="button">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" className="button button-outline">← Back to Home</Link>
      </div>

      <div className="card">
        <div className="card-body">
          {creator.imageURL && (
            <img 
              src={creator.imageURL} 
              alt={creator.name}
              style={{ width: '100%', height: '300px', objectFit: 'cover', marginBottom: '1rem' }}
            />
          )}
          
          <h1>{creator.name}</h1>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>Website:</strong>{' '}
            <a 
              href={creator.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="button button-outline"
              style={{ display: 'inline-block', marginLeft: '0.5rem' }}
            >
              Visit Channel
            </a>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3>About</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{creator.description}</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to={`/creators/${creator.id}/edit`} className="button">
              Edit Creator
            </Link>
            <button 
              onClick={handleDelete}
              className="button"
              style={{ backgroundColor: 'var(--del-color)' }}
            >
              Delete Creator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDetail;
