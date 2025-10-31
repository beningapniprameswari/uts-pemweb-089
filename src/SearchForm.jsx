import React, { useState, useEffect } from 'react';

const SearchForm = ({ onSearch, currentType }) => {
  const [breeds, setBreeds] = useState([]); 
  const [selectedBreed, setSelectedBreed] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      setIsLoading(true);
      setBreeds([]); 
      setSelectedBreed(''); 
      
      try {
        if (currentType === 'dog') {
          const response = await fetch('https://dog.ceo/api/breeds/list/all');
          const data = await response.json();
          const dogBreeds = Object.keys(data.message).map(breedName => ({
            id: breedName, 
            name: breedName.charAt(0).toUpperCase() + breedName.slice(1) 
          }));
          setBreeds(dogBreeds);
        
        } else if (currentType === 'cat') {
          const response = await fetch('https://api.thecatapi.com/v1/breeds');
          const data = await response.json();
          const catBreeds = data.map(breed => ({
            id: breed.id,
            name: breed.name
          }));
          setBreeds(catBreeds);
        }
      } catch (error) {
        console.error("Gagal mengambil daftar breed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBreeds();
  }, [currentType]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(selectedBreed); 
  };

  const labelText = `Pilih Breed ${currentType === 'dog' ? 'Anjing' : 'Kucing'}:`;

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label htmlFor="breed-select">{labelText}</label>
      <select
        id="breed-select"
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
        required
        disabled={isLoading || breeds.length === 0} 
      >
        <option value="" disabled>
          {isLoading ? 'Memuat daftar...' : '-- Pilih salah satu --'}
        </option>
        
        {breeds.map(breed => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>
      <button type="submit" disabled={isLoading}>Cari Gambar</button>
    </form>
  );
};

export default SearchForm;