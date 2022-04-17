import React, { useState } from 'react';
import styles from './addmovies.module.css'


function AddMovies() {
  const [searchTitle, setTitle] = useState("");
  const [year, setYear] = useState(2001);


  function onChange(event) {
    setTitle(event.target.value)
  }
  function onChangeYear(event) {
    setYear(event.target.value)
    console.log(year)
  }

  const handleSubmit = (event) => {
    if (year < 2001 || year > 2022) {
      alert("invalid input ")
    }
    console.log(year)

    event.preventDefault();
    fetch(`http://localhost:3001/addMoviesByKey`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: searchTitle,
        year: year,
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          window.location.href = 'http://localhost:3000';
        },
        (error) => {
          console.log(error);
        }
      )
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
                value={searchTitle}
                onChange={onChange}
              />
            </label>
            <label htmlFor="search-form">
              year
              <input
                type="yearber"
                name="year"
                id="year"
                min={2001}
                max={2022}
                placeholder="year"
                value={year}
                onChange={onChangeYear}
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