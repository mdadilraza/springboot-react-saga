import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListOfEmployee from './components/ListOfEmployee';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';
import EntryPage from './components/EntryPage';
import NotFound from './components/NotFound'; 

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<EntryPage />} />
        <Route path='/employees' element={<ListOfEmployee />} />
        <Route path='/add-employee' element={<EmployeeComponent />} />
        <Route path='/edit-employee/:id' element={<EmployeeComponent />} />
        <Route path='*' element={<NotFound />} /> 
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import ListOfEmployee from './components/ListOfEmployee'
// import HeaderComponent from './components/HeaderComponent'
// import FooterComponent from './components/FooterComponent'
// import {BrowserRouter, Routes ,Route} from 'react-router-dom'
// import EmployeeComponent from './components/EmployeeComponent'
// import EntryPage from './components/EntryPage'
// function App() {
 
//   return (
//     <>
//     <BrowserRouter>
//     <HeaderComponent/>
//     <Routes>
//       {/* http://localhost:3000 */}
//       <Route path='/' element={<EntryPage/>}></Route>
//       {/* http://localhost:3000 */}
//       {/* <Route path='/' element ={<ListOfEmployee/>}>  </Route> */}
//       {/* http:localhost:3000/employees */}
//       <Route path='/employees' element={<ListOfEmployee/>}></Route>

//       {/* http://localhost:3000/add-employee */}
//       <Route path='/add-employee' element={<EmployeeComponent />}></Route>

//       {/* http://localhost:3000/edit-employee/1 */}

//       <Route path='/edit-employee/:id' element={<EmployeeComponent/>}/>

//    </Routes>
//    <FooterComponent/>
//    </BrowserRouter>
//     </>
//   )
// }

// export default App
