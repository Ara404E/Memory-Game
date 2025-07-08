import '../styles//Card/Card.css'
import { useGifs } from "../hooks/getGifs";
import { TiltedCard } from './TiltedCard';
import { useState } from 'react';
import Loading from './Loading';
import Scoreboard from './Scoreboard';
import Gameover from './GameOver';

  const GIF_DATA = [
    {id:"p0ydOvZ6xm8PMe5qlr", name:'larry', isClicked: false},
    {id:"xT1z8Fz2YP7Tcc5Nwa", name:"james" , isClicked:false }, 
    {id:"GHuZ9pUzPbKiVbpicC", name:"creature" , isClicked:false },  
    {id:"VLh8dZ6R9usgYf5otp", name:"ronald" , isClicked:false },  
    {id:"U6gFBjfhITpNyqLm3b", name:"debbie" , isClicked:false },  
    {id:"Y7XUFvSofGXXGKC8HI", name:"Jeffery" , isClicked:false },  
    {id:"RYErG7j0MllnFyQMo5", name:"lets just say Larry" , isClicked:false },
    {id:"uFGvtGgQ4v2IwySX2C", name:"orange diva" , isClicked:false },  
    {id:"2zUn8hAwJwG4abiS0p", name:"war car" , isClicked:false }, 
    {id:"eaq9KLdCRaIerLnPjW", name:"weewee" , isClicked:false } 
  ]
    
  const gifIds = GIF_DATA.map(gifs => gifs.id).filter(Boolean)

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


  function Card({GIPHY_API, API_KEY}) {
    const [ score, setScore ] = useState(0)
    const {cards, loading, error} = useGifs(GIPHY_API,API_KEY,gifIds)
    const [gifData, setGifData] = useState(GIF_DATA)
    const [gameover, setGameover] = useState(false)

    const handleClick = (id) => {
        setGifData(cards => {
          const currCard = cards.find(card => card.id === id )
                if(currCard.isClicked) {
                    setGameover(true)
                    GIF_DATA.map(card => ({...card, isClicked: false }))
                    score === 0
                  return <Gameover />
                }
          const updateCards = cards.map(card => card.id === id ? { ...card, isClicked: true } : card )
                setScore(score => score++ )
          return shuffleArray(updateCards)
        } 
      )
    }

    if (loading) return <Loading />
    if (error) return <p>Error: {error}</p>
    if (gameover) return <Gameover score={score}/>
    
    return (
    <div className='container'>

      <div 
      className="grid grid-cols-3 card-container">
          { gifData.map((gif) => {
            const url = cards[gifIds.indexOf(gif.id)]
            return (
              <TiltedCard 
              key={gif.id}
              name={gif.name} 
              src={url}
              isClicked={gif.isClicked}
              onClick={() => handleClick(gif.id)}
              />
            )}
          )}
      </div>

      <Scoreboard />
    
    </div>
    );
  }
  

  export default Card;
