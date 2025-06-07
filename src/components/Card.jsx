import { useEffect, useState } from "react";


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

    
  const validIds = gifIds.filter(Boolean)
  


  function Card({API_KEY}) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
  
  
    useEffect(() => {
      const fetchGifs = async () => {
        try {
          const idsString = validIds.join(",");
          const response = await fetch(`https://api.giphy.com/v1/gifs?ids=${idsString}&api_key=${API_KEY}`);
          const result = await response.json();
    
          const images = result.data.map(gif => gif.images.original.url);
    
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
    }, [API_KEY]);
  
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
    
    return (
      <div className="card-div">
        <div className="card">
          
          {
          cards.map((url, index) => (
            <img key={index} src={url} alt={`card-${index}`}/> 
          ))}
        </div>
      </div>
    );
  }
  

  export default Card;
