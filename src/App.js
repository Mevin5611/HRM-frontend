import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import {useAuthContext} from './hooks/useAuthContext'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';



function App() {
  const {user}=useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route path='/'element={<Hero/>} />
          <Route path='/home'element={user ? <Home/> : <Navigate to="/login" />} />
          <Route path='/login'element={!user ? <Login/> : <Navigate to="/home" />} />
          <Route path='/signup'element={!user ? <Signup/> : <Navigate to="/login" />} />
          <Route path='/admin'element={!user ? <AdminLogin/> : <Navigate to="/" /> } />
          

          
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
