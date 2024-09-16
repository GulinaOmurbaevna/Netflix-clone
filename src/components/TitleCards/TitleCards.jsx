import React, { useEffect , useRef, useState} from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';
import Player from '../../pages/Player/Player';
// import card_data from '../../assets/cards/Cards_data'

const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzZmYmQ5NGVmN2FkNTAxMjMzZWU0M2M4YzE5MWI2NSIsIm5iZiI6MTcyNjIyNTU0Ny4yNjE4MjIsInN1YiI6IjY2ZTQwZDEzMjgwNDhkOTJkZWY5NjgyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ot8G3l29y5iTURxEDYBaTOReTugyuBLUAmSx2lHE7WU'
    }
  };
  
 
 
  
  const handleWheel = (event) => {
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;
  }
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
     cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])
  return (
    <div className='title-cards'>
        <h2>{title?title: "Popular on NETFLIX"}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card, index) => {
            return <Link to={`/player/${card.id}`} className="card" key={index}>
                 <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                 <p>{card.original_title}</p>
            </Link>
          })}
        </div>
    </div>
  )
}

export default TitleCards
