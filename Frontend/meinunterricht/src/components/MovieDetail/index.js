import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import styles from './moviedetail.module.css'

function MovieDetail() {

    let { id } = useParams();

    const [item, setItems] = useState({});

    useEffect(() => {
        getMovieDetail()
    }, [])

    const getMovieDetail = async () => {
        fetch(`http://localhost:3001/movieDetail/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setItems(result.data);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    return (
        <>
            {
                item && item.title &&
                <>
                    {<div className={styles.image_container}>
                        <img src={item.poster} alt="Logo" />
                    </div>}
                    <div className={styles.detail_container}>
                        <ul>
                            <li><b>ImdbID</b> : {item.imdbid}  </li>
                            <li><b>Title</b> : {item.title}  </li>
                            <li><b>Director</b> : {item.director}  </li>
                            <li><b>Plot</b> : {item.plot}  </li>
                            <li><b>Releasing year</b> : {item.year}  </li>
                        </ul>
                    </div>

                </>
            }
        </>

    )
}

export default MovieDetail