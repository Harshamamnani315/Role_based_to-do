import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AllRequests from './context/todos/AllRequests';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import SuperAdmin from './components/SuperAdmin';
import Usertodos from './components/Usertodos';
import Main from './components/Main';


function App() {
  const [islogin, setIsLogin] = useState(false);
  return (
    <>
      <AllRequests>
        <Router>
          <Navbar islogin = {islogin} setIsLogin = {setIsLogin}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Main/>
              </Route>
              <Route exact path="/user">
                <Home/>
              </Route>
              <Route exact path="/admin">
                <Admin />
              </Route>
              <Route exact path="/superadmin">
                <SuperAdmin />
              </Route>
              <Route exact path="/todos/:id">
                <Usertodos/>
              </Route>
              <Route exact path="/login">
                <Login setIsLogin = {setIsLogin}/>
              </Route>
              <Route exact path="/signup">
                <Signup/>
              </Route>
            </Switch>
          </div>
        </Router>
      </AllRequests>
    </>
  );
}

export default App;
