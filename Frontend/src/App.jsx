// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import PrivateRoute from './components/auth/PrivateRoute';
import NotFound from './pages/NotFound';
import AppLayout from './components/layout/AppLayout';
import Chat from './pages/Chat';

let user = false;

const App = () => {
  return (
    <Router> 
        <Routes>
          <Route element={<PrivateRoute user={user} redirect='/login' /> } > 
            <Route element={<AppLayout />} > 
              <Route path="/" element={<Home />} />
              <Route path='/chat' element={<Chat />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute user={!user}/>} > 
            <Route path="/login" element={<Login />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>

    </Router>    
  )
}

export default App
