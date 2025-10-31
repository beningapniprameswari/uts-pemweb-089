import React, { useState, useEffect } from 'react';

const DataTable = () => {
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFacts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const cacheBuster = `&_t=${Date.now()}`;
      const response = await fetch(`https://catfact.ninja/facts?limit=5${cacheBuster}`);

      if (!response.ok) throw new Error('Gagal mengambil fakta kucing');
      const data = await response.json();
      setFacts(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFacts();
  }, []); 

  return (
    <section className="facts-section">
      <h2>Fakta Kucing Menarik</h2>

      <button onClick={fetchFacts} disabled={isLoading} className="refresh-btn">
        {isLoading ? 'Memuat...' : 'Dapatkan Fakta Baru'}
      </button>

      {error && <p className="error-text">{error}</p>}
      
      <table className="data-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Fakta</th>
            <th>Panjang (Karakter)</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>Memuat...</td>
            </tr>
          )}
          {!isLoading && facts.map((factItem, index) => (
            <tr key={factItem.length + index}>
              <td>{index + 1}</td>
              <td>{factItem.fact}</td>
              <td>{factItem.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default DataTable;