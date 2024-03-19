import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddList from './pages/AddList'
import TextList from './pages/TextList'
import Login from './pages/Login'
import Register from './pages/Register'
import React from 'react'
import ProtectRoute from './auth/ProtectRoute'
const user = true

// Add a state for isLoggedIn and a function to update it
function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectRoute user={!isLoggedIn} redirect="/add-list">
              <Login onLogin={login} />
            </ProtectRoute>
          }
        />

        <Route element={<ProtectRoute user={isLoggedIn} />}>
          <Route path="/add-list" element={<AddList />} />
          <Route path="/text-list" element={<TextList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;