import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import AddMovies from '../AddMovies';


function SearchMovie() {
  return (
    <>
      <div>
        <a href={`http://localhost:3000/add-movies`}>If Search Not found ask us to bulk your search</a>
      </div>
      <SearchBar />
    </>

  )
}

export default SearchMovie