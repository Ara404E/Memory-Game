import axios from "axios";
import { useState, useEffect } from "react";


export const useGifs = (GIPHY_API, API_KEY, gifIds) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        if(!API_KEY || !GIPHY_API || !gifIds.length) {
            setError("Missing required data")
                setLoading(false)
        }
        const fetchGifs = async () => {
            try {
                const idToString = gifIds.join(',')
                const response = await axios.get(`${GIPHY_API}?ids=${idToString}&api_key=${API_KEY}`)
                const getImgs = response.data.data.map(gif => gif.images.original.url)
                setCards(getImgs)

            } catch (error) {
                setError(error)
        
            } finally{
                setTimeout(() => setLoading(false), 2000 )
            }
        }
        fetchGifs()
    },[GIPHY_API,API_KEY,gifIds])

    return { cards , loading , error }
}

export default useGifs