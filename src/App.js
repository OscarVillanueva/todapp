import { Routes, Route } from "react-router";
import Login from './pages/login'
import SignUp from './pages/signUp';
import authToken from './config/authToken'
import StateAuth from './context/auth/StateAuth'

// Revisamos si tenemos token
const token = localStorage.getItem("token")

if ( token ) authToken( token )

function App() {
  return (
    
    <StateAuth>
      <Routes>

        <Route
          path = "/"
          element = { <Login /> }
        />

        <Route
          path = "/sign-up"
          element = { <SignUp /> }
        />

      </Routes>
    </StateAuth>
    
  );
}

export default App;
