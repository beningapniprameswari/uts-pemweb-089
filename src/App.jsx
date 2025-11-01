import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import SearchForm from './SearchForm.jsx';
import DataTable from './DataTable.jsx';
import DetailCard from './DetailCard.jsx';
import Favorites from './Favorites.jsx';
import Footer from './Footer.jsx';

const App = () => {
  const [animalType, setAnimalType] = useState('dog');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages('', 12); 
  }, [animalType]);

  const fetchImages = async (breedIdentifier = '', count = 12, imageType = 'static', hasBreeds = true) => {
    setIsLoading(true);
    setError(null);
    let url = '';
    const limit = Math.max(1, Math.min(count, 20)); 

    try {
      if (animalType === 'dog') {
        const breedName = breedIdentifier;
        url = breedName
          ? `https://dog.ceo/api/breed/${breedName}/images/random/${limit}`
          : `https://dog.ceo/api/breeds/image/random/${limit}`;

      } else {
        const breedId = breedIdentifier;
        const params = new URLSearchParams({
          limit: limit,
          has_breeds: hasBreeds ? 1 : 0,
          mime_types: imageType === 'static' ? 'jpg,png' : 'gif'
        });

        if (breedId) {
          params.append('breed_ids', breedId);
        }
        
        url = `https://api.thecatapi.com/v1/images/search?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to load data');
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

  const handleBreedSearch = (params) => {
    fetchImages(params.breed, params.count, params.type, params.hasBreeds);
  };

  return (
    <div className="app-container">
      <Header onNavigate={handleAnimalChange} currentType={animalType} />
      
      <main>
        <SearchForm onSearch={handleBreedSearch} currentType={animalType} />

        <section>
          <h2>Gallery {animalType === 'dog' ? 'Dog 🐶' : 'Cat 🐱'}</h2>
          
          <div className="gallery-grid">
            {isLoading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">Error: {error}</p>}
            
            {!isLoading && !error && images.map((imgUrl) => (
              <DetailCard key={imgUrl} imageUrl={imgUrl} />
            ))}
          </div>
        </section>

        {animalType === 'cat' && <DataTable />}
        
        <Favorites />
      </main>

      <Footer />
    </div>
  );
};

export default App;