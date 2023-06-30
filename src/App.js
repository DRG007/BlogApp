import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Addblog from './Components/Addblog';
import Profile from './Components/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Myblogs from './Components/Myblogs';import Editblog from './Components/Editblog';
;
function App() {
  return (<div>
      <Routes>
        <Route path='/' element={<Login />} ></Route>
        <Route path='/Login' element={<Login />} ></Route>
        <Route path='/Signup' element={<Signup />} ></Route>
        <Route path='/Dashboard' element={<Dashboard />} ></Route>
        <Route path='/Addblog' element={<Addblog />} ></Route>
        <Route path='/Profile' element={<Profile />} ></Route>
        <Route path='/Myblogs' element={<Myblogs />}></Route>
        <Route path='/Myblogs/Editblog/:id' element={<Editblog />}></Route>
      </Routes>
    <ToastContainer/>
    </div>
  );
}

export default App;
