import Card from "./components/Card";


const API_KEY = import.meta.env.VITE_GIPHY_API_KEY

function App(){
  return (
    <div>
      <Card API_KEY={API_KEY} />
    </div>
  )
}


export default App;