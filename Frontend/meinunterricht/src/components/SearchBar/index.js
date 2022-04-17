import React, { useState, useEffect } from 'react';
import MovieList from '../MovieList';
import styles from './searchbar.module.css'


function SearchBar() {
  const [q, setQ] = useState("");
  const [confirm, setConfirm] = useState(false)
  
  
  function onChange(event) {
    setQ(event.target.value)
    setConfirm(false)

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setConfirm(true)
  }
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
          <div className="search-wrapper">
            <label htmlFor="search-form">
              Search movie of your choice
              <input 
                className={styles.search_bar}
                type="search"
                name="search-form"
                id="search-form"
                placeholder="Search for..."
                value={q}
                onChange={onChange}
              />
            </label>
            <input className={styles.submit} type="submit" />
          </div>
        </div>

      </form>
      {confirm && <MovieList q={q} />}

    </>
  );
}

export default SearchBar