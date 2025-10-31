import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import SearchForm from './SearchForm.jsx';
import DataTable from './DataTable.jsx';
import DetailCard from './DetailCard.jsx';
import Favorites from './Favorites.jsx';

const App = () => {
  const [animalType, setAnimalType] = useState('dog');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages(); 
  }, [animalType]);

  const fetchImages = async (breedIdentifier = '') => {
    setIsLoading(true);
    setError(null);
    let url = '';

    try {
      if (animalType === 'dog') {
        const breedName = breedIdentifier;
        url = breedName
          ? `https://dog.ceo/api/breed/${breedName}/images/random/12`
          : 'https://dog.ceo/api/breeds/image/random/12';

      } else {
        const breedId = breedIdentifier;
        url = breedId
          ? `https://api.thecatapi.com/v1/images/search?limit=12&breed_ids=${breedId}`
          : 'https://api.thecatapi.com/v1/images/search?limit=12';
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Gagal mengambil data gambar.');
      const data = await response.json();

      let imageUrls = [];
      if (animalType === 'dog') {
        imageUrls = data.message;
      } else {
        imageUrls = data.map(item => item.url);
      }
      setImages(imageUrls);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnimalChange = (type) => {
    setAnimalType(type);
  };

  const handleBreedSearch = (breed) => {
    fetchImages(breed);
  };

  return (
    <div className="app-container">
      <Header onNavigate={handleAnimalChange} currentType={animalType} />
      
      <main>
        <SearchForm onSearch={handleBreedSearch} currentType={animalType} />

        <section>
          <h2>Galeri {animalType === 'dog' ? 'Anjing' : 'Kucing'}</h2>
          
          <div className="gallery-grid">
            {isLoading && <p className="loading-text">Memuat gambar...</p>}
            {error && <p className="error-text">Error: {error}</p>}
            
            {!isLoading && !error && images.map((imgUrl) => (
              <DetailCard key={imgUrl} imageUrl={imgUrl} />
            ))}
          </div>
        </section>

        {animalType === 'cat' && <DataTable />}
        
        <Favorites />
      </main>
    </div>
  );
};

export default App;