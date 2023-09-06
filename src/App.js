import './App.css';
import Home from './Routes/Home';
import { BrowserRouter as Router,
        Routes,
        Route,
} from 'react-router-dom'

import Detail from './Routes/Detail';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/movie/:id' element={<Detail/>} />
        <Route path='/' element={<Home/> } />
        
      </Routes>
    </Router>
  );
}

export default App;
