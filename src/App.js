import Home from './Routes/Home';
import { BrowserRouter as Router,
        Routes,
        Route,
} from 'react-router-dom'

import Detail from './Routes/Detail';
import Footer from './Components/Footer';
function App() {

  return (
    // basename={`${process.env.PUBLIC_URL}/`}
    <>
    <Router >
      <Routes>
        <Route path='/movie/:id' element={<Detail/>} />
        <Route path='/' element={<Home/> } />
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
