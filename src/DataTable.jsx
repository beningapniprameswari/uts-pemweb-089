import React, { useState, useEffect } from 'react';

const DataTable = () => {
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFacts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const randomPage = Math.floor(Math.random() * 20) + 1;
      const response = await fetch(`https://catfact.ninja/facts?limit=5&page=${randomPage}`);

      if (!response.ok) throw new Error('Failed to load data');
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
      <h2>Fun Facts About Cat 😸💡</h2>

      <button onClick={fetchFacts} disabled={isLoading} className="refresh-btn">
        {isLoading ? 'Loading...' : 'Get New Facts'}
      </button>

      {error && <p className="error-text">{error}</p>}
      
      <table className="data-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Facts</th>
            <th>Characters Count</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>Loading...</td>
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