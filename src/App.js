import { Routes, Route } from "react-router";
import Login from './pages/login'
import SignUp from './pages/signUp';
import Home from "./pages/Home";
import authToken from './config/authToken'
import StateAuth from './context/auth/StateAuth'
import StateProject from './context/projects/StateProject'
import Tasks from "./pages/Tasks";

// Revisamos si tenemos token
const token = localStorage.getItem("token")

if ( token ) authToken( token )

function App() {
  return (
    
    <StateAuth>
      <StateProject>

          <Routes>
            
            <Route
              path = "/"
              element = { <Login /> }
            />
            
            <Route
              path = "/sign-up"
              element = { <SignUp /> }
            />
            
            <Route
              path = "/home"
              element = { <Home /> }
            />

            <Route
              path = "/tasks"
              element = { <Tasks /> }
            />
            
          </Routes>

      </StateProject>
    </StateAuth>
    
  );
}

export default App;
