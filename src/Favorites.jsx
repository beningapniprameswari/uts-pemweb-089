import React, { useState, useEffect } from 'react';
import DetailCard from './DetailCard.jsx';

const Favorites = () => {
  const [favoriteImages, setFavoriteImages] = useState([]);

  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteImages') || '[]');
    setFavoriteImages(favorites);
  };

  useEffect(() => {
    loadFavorites();

    window.addEventListener('storage', loadFavorites);

    return () => {
      window.removeEventListener('storage', loadFavorites);
    };
  }, []);

  return (
    <section className="favorites-section">
      <h2>Favorite Pictures 📸</h2>
      {favoriteImages.length === 0 ? (
        <p>There is no favorite pictures. Choose picture and Press "☆ Favorite?"</p>
      ) : (
        <div className="gallery-grid">
          {favoriteImages.map(url => (
            <DetailCard key={url} imageUrl={url} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;