import React, { useState, useEffect } from 'react';
import styles from './addmovies.module.css'


function AddMovies() {
  const [q, setQ] = useState("");
  const [num, setN] = useState("");
  
  
  function onChange(event) {
    setQ(event.target.value)

  }

  const handleSubmit = (event) => {
    setN(num);
    console.log(event.target.value)

    event.preventDefault();
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
            <label htmlFor="search-form">
              year
              <input 
                type="num"
                name="num"
                id="year"
                placeholder="year"
                value={num}
              />
            </label>
            <input className={styles.submit} type="submit" />
          </div>
        </div>

      </form>
      

    </>
  );
}

export default AddMovies