import React, { useState, useEffect } from 'react';
import styles from './movielist.module.css'


function MovieList(props) {
  const [items, setItems] = useState([]);
  const [page, setpage] = useState(1)


  const handleChange = (type) => {
    if (page >= 1) {
      switch (type) {
        case 'inc':
          setpage(page + 1)
          break;
        case 'dec':
          if (page > 1) setpage(page - 1)
          break;

        default:
          break;
      }
    }
  }

  useEffect(() => {
    getMovieList(props.q)

  }, [page])

  const getMovieList = (search) => {
    //fetch(`http://www.omdbapi.com/?s=${search}&apikey=7b1d1da`)
    fetch(`http://localhost:3001/getAllMovieList?title=${search}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.data)
          setItems(result.data);
        },
        (error) => {
          console.log(error);
        }
      )
  }
  return (
    <>
      <thead  >
        <tr>
          <th >
            Id
          </th>
          <th >
            Name
          </th>
          <th >
            Year
          </th>
          <th >
            Type
          </th>
          <th >
            Detail
          </th>
        </tr>

      </thead>
      {items && items.length > 0 && items.map(item => {
        return (
          <tr>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.year}</td>
            <td>{item.type}</td>
            <td><a href={`http://localhost:3000/detail/${item.id}`}>See Detail</a></td>
          </tr>
        )

      })
      }
      {items && items.length > 0 &&
        <div className={styles.button_container}>
          <button onClick={() => handleChange('dec')}>{'<'}</button> <span className='px-4'>{page}</span> <button onClick={() => handleChange('inc')}>{'>'}</button>
        </div>
      }
    </>
  );
}

export default MovieList