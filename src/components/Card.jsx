import axios from "axios";
import { useEffect, useRef, useState } from "react";
import '../styles/Card.css'

  const gifIds = [
    "p0ydOvZ6xm8PMe5qlr", // Larry 1
    "xT1z8Fz2YP7Tcc5Nwa", // James 2
    "GHuZ9pUzPbKiVbpicC", // creature 3
    "VLh8dZ6R9usgYf5otp", // ronald 4
    "U6gFBjfhITpNyqLm3b", // debbie 5
    "Y7XUFvSofGXXGKC8HI", // Jeffery 6
    "RYErG7j0MllnFyQMo5", // lets just say Larry 7
    "uFGvtGgQ4v2IwySX2C", // slay orange car 8
    "2zUn8hAwJwG4abiS0p", // war car 9
    "eaq9KLdCRaIerLnPjW"// weewee car 10
    ]
    
  const shuffleArray = (arr) => {
    const newArray= [...arr]
        for (let i=newArray.length - 1; i> 0 ; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i] , newArray[j]] = [newArray[j] , newArray[i]]
        }
        return newArray
  }

    // checks if the ids are valid
  const validIds = gifIds.filter(Boolean)
  


  function Card({GIPHY_API, API_KEY}) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);   
    const [transform, setTransform] = useState('')
    const cardRef = useRef(null)
  
    const handleMouseMove = (e) =>{
      if(!cardRef.current) return;

      const card = cardRef.current
      const rect = card.getBoundingClientRect()

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top


      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const relX = (x - centerX) / centerX
      const relY = (y - centerY) / centerY

      const tiltX = relY * 5
      const tiltY = relX * -5

      const originX = relX > 0 ? "left" : "right"
      const originY = relY > 0 ? "top" : "bottom"

      setTransform(`
        roatetX(${tiltX}deg)
        roatetY(${tiltY}deg)
        `)

        card.style.transformOrigin = `${originX} ${originY}`
    }

    const handleMouseLeave = () =>{
      setTransform('')
    }

    useEffect(() => {
      const fetchGifs = async () => {
        try {
          const idsString = validIds.join(",");
          const response = await axios.get(`${GIPHY_API}?ids=${idsString}&api_key=${API_KEY}`);    
          const images = response.data.data.map(gif => gif.images.original.url)
    
          // const shuffledImages = shuffleArray(images)
          setCards(images);

        } catch (err) {
          setError(err.message);
          console.error('Fetch error:', err);
        } finally {
          setLoading(false);
        }
      };
    
      fetchGifs();
  
      return () =>{
        setLoading(true)
      }
    }, [GIPHY_API,API_KEY]);
  
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
    
    return (
      <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="grid grid-cols-3 card-container">
          {
          cards.map((url, index) => (
            <img key={index}
            src={url}
            alt={`card-${index}`}
            className="
            rounded-lg border-4 border-black card-image"
            style={transform}
            /> 
          ))}
        </div>
    );
  }
  

  export default Card;
