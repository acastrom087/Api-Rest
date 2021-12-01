import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import Home from './components/views/Home';
import Login from './components/views/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foto from './components/views/Foto';
import Modal from './components/views/Modal';



// Login, funciones del login y rutas;
function App() {



  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/foto/:id" component={Foto} />
            <Route exact path="/mobal/:id" component={Modal} />
            <Route render={() => <h1>Not found!</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
