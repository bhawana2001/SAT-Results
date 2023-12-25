import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import { GetAllResults } from './components/GetAllResults';
import { InsertData } from './components/InsertData';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Menu />} />
          <Route exact path="/insertData" element={<InsertData />} />
          <Route exact path="/satResults" element={<GetAllResults />} />
        </Routes>


      </Router>
    </div>
  );
}

export default App;
