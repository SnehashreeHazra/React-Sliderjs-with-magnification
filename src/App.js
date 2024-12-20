import Slider from "./Slider/Slider.jsx";
import slides from './mock.json'
import './App.css'


function App() {
 
  return (
    <div className="App">
        <Slider slides={slides}/>
    </div>
    
  );
}

export default App;
