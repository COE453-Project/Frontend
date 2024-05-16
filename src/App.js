import './App.css';
import Medicines from './Components/Medicines';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Navigate } from 'react-router';
import { Routes } from 'react-router-dom';
import AddMedicine from './Components/AddMedicine';
import UpdateMedicine from './Components/UpdateMedicine';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/AddMedicine" element={<AddMedicine />} />
          <Route path="/" element={<Navigate to="/medicines" />} />
          <Route path="/UpdateMedicine" element={<UpdateMedicine />} />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
