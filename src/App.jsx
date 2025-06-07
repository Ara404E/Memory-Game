import Card from "./components/Card";
import './styles/App.css'

const GIPHY_API = import.meta.env.VITE_GIPHY_API
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY

function App(){
  return (
    <div className="min-h screen flex flex-col justify-center items-center bg-gray-900 p-4">
      <Card  GIPHY_API={GIPHY_API} API_KEY={API_KEY} />
      </div>
  )
}


export default App;