import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Student from './Students/Student';
import CreateStudent from './Students/CreateStudent';
import Login from './Login/login';
import Signup from './Login/signup';
import Forgot from './Login/forgot';
function App(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/forgot' element={<Forgot/>}></Route>
        <Route path='/student' element={<Student />}></Route>
        <Route path='/create' element={<CreateStudent />}></Route> 
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App;
