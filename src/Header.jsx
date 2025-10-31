import React from 'react';

const Header = ({ onNavigate, currentType }) => {
  return (
    <header className="app-header">
      <h1>Dog and Cat Gallery Facts</h1>
      <nav>
        <button
          className={currentType === 'dog' ? 'active' : ''}
          onClick={() => onNavigate('dog')}
          aria-pressed={currentType === 'dog'}
        >
          Anjing
        </button>
        <button
          className={currentType === 'cat' ? 'active' : ''}
          onClick={() => onNavigate('cat')}
          aria-pressed={currentType === 'cat'}
        >
          Kucing
        </button>
      </nav>
    </header>
  );
};

export default Header;