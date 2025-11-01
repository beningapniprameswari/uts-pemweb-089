import React from 'react';
const Header = ({ onNavigate, currentType }) => {
  return (
    <header className="app-header">
      <h1>🐾 Dogs and Cats Gallery 🐾</h1>
      <nav>
        <button
          className={currentType === 'dog' ? 'active' : ''}
          onClick={() => onNavigate('dog')}
          aria-pressed={currentType === 'dog'}
        >
          Dogs
        </button>
        <button
          className={currentType === 'cat' ? 'active' : ''}
          onClick={() => onNavigate('cat')}
          aria-pressed={currentType === 'cat'}
        >
          Cats
        </button>
      </nav>
    </header>
  );
};

export default Header;