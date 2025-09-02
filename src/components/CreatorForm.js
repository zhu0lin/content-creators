import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const CreatorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCreator = useCallback(async () => {
    try {
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
      const creator = data[0]; // Supabase returns an array, we want the first item

      setFormData({
        name: creator.name || '',
        url: creator.url || '',
        description: creator.description || '',
        imageURL: creator.imageURL || ''
      });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching creator:', err);
    }
  }, [id]);

  useEffect(() => {
    if (isEdit && id) {
      fetchCreator();
    }
  }, [id, isEdit, fetchCreator]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.url.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields (name, URL, and description)');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEdit) {
        // Update existing creator
        const response = await fetch(`${supabase.supabaseUrl}/rest/v1/creators?id=eq.${id}`, {
          method: 'PATCH',
          headers: {
            'apikey': supabase.supabaseKey,
            'Authorization': `Bearer ${supabase.supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            url: formData.url.trim(),
            description: formData.description.trim(),
            imageURL: formData.imageURL.trim() || null
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        navigate(`/creators/${id}`);
      } else {
        // Create new creator
        const response = await fetch(`${supabase.supabaseUrl}/rest/v1/creators`, {
          method: 'POST',
          headers: {
            'apikey': supabase.supabaseKey,
            'Authorization': `Bearer ${supabase.supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            url: formData.url.trim(),
            description: formData.description.trim(),
            imageURL: formData.imageURL.trim() || null
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        navigate(`/creators/${data[0].id}`);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error saving creator:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" className="button button-outline">← Back to Home</Link>
      </div>

      <div className="card">
        <div className="card-body">
          <h1>{isEdit ? 'Edit Creator' : 'Add New Creator'}</h1>
          
          {error && (
            <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid">
              <div>
                <label htmlFor="name">
                  Name <span style={{ color: 'var(--del-color)' }}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter creator's name"
                  required
                />
              </div>

              <div>
                <label htmlFor="url">
                  URL <span style={{ color: 'var(--del-color)' }}>*</span>
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description">
                Description <span style={{ color: 'var(--del-color)' }}>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the creator and their content..."
                rows="4"
                required
              />
            </div>

            <div>
              <label htmlFor="imageURL">Image URL (optional)</label>
              <input
                type="url"
                id="imageURL"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {formData.imageURL && (
              <div style={{ marginTop: '1rem' }}>
                <label>Preview:</label>
                <img 
                  src={formData.imageURL} 
                  alt="Preview"
                  style={{ 
                    width: '100%', 
                    maxWidth: '300px', 
                    height: '200px', 
                    objectFit: 'cover',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius)'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button 
                type="submit" 
                className="button"
                disabled={loading}
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Creator' : 'Create Creator')}
              </button>
              
              <Link to="/" className="button button-outline">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatorForm;
