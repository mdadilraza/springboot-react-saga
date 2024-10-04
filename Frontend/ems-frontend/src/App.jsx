import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListOfEmployee from './components/ListOfEmployee';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';
import EntryPage from './components/EntryPage';
import NotFound from './components/NotFound';

import EmployeeProfile from './components/EmployeeProfile';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<EntryPage />} />
        <Route path='/employees' element={<ListOfEmployee />} />
        <Route path='/add-employee' element={<EmployeeComponent />} />
        <Route path='/edit-employee/:id' element={<EmployeeComponent />} />
        <Route path='/employee' element={<EmployeeProfile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

