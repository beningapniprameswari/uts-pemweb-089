import React, { useState } from 'react';

const getFavorites = () => {
  return JSON.parse(localStorage.getItem('favoriteImages') || '[]');
};

const DetailCard = ({ imageUrl }) => {
  const [isFavorited, setIsFavorited] = useState(() => {
    return getFavorites().includes(imageUrl);
  });

  const handleFavorite = () => {
    const favorites = getFavorites();
    let newFavorites;

    if (isFavorited) {
      newFavorites = favorites.filter(url => url !== imageUrl);
    } else {
      newFavorites = [...favorites, imageUrl];
    }

    localStorage.setItem('favoriteImages', JSON.stringify(newFavorites));
    setIsFavorited(!isFavorited);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="gallery-card">
      <img src={imageUrl} alt="Animal Picture" loading="lazy" />
      <button
        className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
        onClick={handleFavorite}
      >
        {isFavorited ? '★ Favorite!' : '☆ Favorite?'}
      </button>
    </div>
  );
};

export default DetailCard;