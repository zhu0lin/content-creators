import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

const CreatorList = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${supabase.supabaseUrl}/rest/v1/creators?select=*`, {
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
      setCreators(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching creators:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
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

        // Remove the creator from the local state
        setCreators(creators.filter(creator => creator.id !== id));
      } catch (err) {
        setError(err.message);
        console.error('Error deleting creator:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Content Creators</h1>
        <p>Loading creators...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Content Creators</h1>
        <div className="alert alert-danger">
          <p>Error: {error}</p>
          <button onClick={fetchCreators} className="button">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '3rem',
          color: 'white'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            Content Creators
          </h1>
          <Link 
            to="/creators/new" 
            style={{
              background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 212, 255, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.3)';
            }}
          >
            + Add New Creator
          </Link>
        </div>

        {creators.length === 0 ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>No creators found</h3>
            <p style={{ marginBottom: '2rem', opacity: 0.8 }}>Get started by adding your first content creator!</p>
            <Link 
              to="/creators/new" 
              style={{
                background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)'
              }}
            >
              Add Creator
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            padding: '0 1rem'
          }}>
            {creators.map((creator) => (
              <div 
                key={creator.id} 
                style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                }}
              >
                {/* Background Image */}
                {creator.imageURL && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${creator.imageURL})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.3,
                    zIndex: 1
                  }} />
                )}
                
                {/* Content Overlay */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '2rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '300px'
                }}>
                  {/* Header with name and action buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{
                      color: '#00d4ff',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      margin: 0,
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                      flex: 1,
                      marginRight: '1rem'
                    }}>
                      {creator.name}
                    </h3>
                    
                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link 
                        to={`/creators/${creator.id}`}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none',
                          fontSize: '1.2rem',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = 'rgba(0, 212, 255, 0.8)';
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.transform = 'scale(1)';
                        }}
                        title="View Details"
                      >
                        ℹ️
                      </Link>
                      <Link 
                        to={`/creators/${creator.id}/edit`}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none',
                          fontSize: '1.2rem',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = 'rgba(255, 193, 7, 0.8)';
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.transform = 'scale(1)';
                        }}
                        title="Edit Creator"
                      >
                        ✏️
                      </Link>
                    </div>
                  </div>

                  {/* Social media icons */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <a 
                      href={creator.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        width: '35px',
                        height: '35px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = 'rgba(255, 0, 0, 0.8)';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'scale(1)';
                      }}
                      title="Visit Channel"
                    >
                      ▶️
                    </a>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      width: '35px',
                      height: '35px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      backdropFilter: 'blur(10px)'
                    }}>
                      🐦
                    </div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      width: '35px',
                      height: '35px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      backdropFilter: 'blur(10px)'
                    }}>
                      📷
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    margin: 0,
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                    flex: 1
                  }}>
                    {creator.description.length > 120 
                      ? `${creator.description.substring(0, 120)}...` 
                      : creator.description
                    }
                  </p>

                  {/* Delete button */}
                  <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleDelete(creator.id)}
                      style={{
                        background: 'rgba(220, 53, 69, 0.8)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = 'rgba(220, 53, 69, 1)';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'rgba(220, 53, 69, 0.8)';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      Delete Creator
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorList;
