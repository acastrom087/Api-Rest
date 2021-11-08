import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import Home from './components/views/Home';
import Login from './components/views/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fotos from './components/views/Fotos';
import Modal from './components/views/Modal';



// Login, funciones del login y rutas;
function App() {

  const baseURL = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState([]);
  const [loggedIn, setloggedIn] = useState(false);



  useEffect(() => {
    axios.get(baseURL).then(response => {
      setUsers(response.data);
    })
  }, []);



  const validacion = () => {
    var username = document.getElementById("usernameEmail").value;
    var password = document.getElementById("password").value;
    var user = null
    users.map(u => {
      if ((username === u.username || username === u.email) && password === u.address.zipcode) {
        user = u;
        localStorage.setItem("usuario", user.id)
        localStorage.setItem("nombre", user.name)
        setloggedIn(true);
      }
      return (user);
    })
  }



  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/home" /> : <Login loguear={validacion} />}
            </Route>
            <Route exact path="/home" component={Home} />
            <Route exact path="/fotos/:id" component={Fotos} />
            <Route exact path="/mobal/:id" component={Modal} />
            <Route render={() => <h1>Not found!</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
