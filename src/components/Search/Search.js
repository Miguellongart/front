import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';

function Search({ setProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/items?q=${searchTerm}`);
      const data = await response.json();
      setProducts(data);
      navigate('/items');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      fetchProducts();
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.content}>
      <div className={styles.input}>
        <input type="text" className={styles.searchInput} placeholder="Buscar..." value={searchTerm} onChange={handleInputChange} />
      </div>
      <button className={styles.buttonStyled} onClick={handleSearch}> Buscar  </button>
    </div>
  );
}

export default Search;
