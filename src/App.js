import { Routes, Route } from "react-router";
import Login from './pages/login'
import SignUp from './pages/signUp';

function App() {
  return (
    
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


  );
}

export default App;
