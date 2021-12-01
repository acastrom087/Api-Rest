import CreateUser from './CreateUser';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import sweet from "sweetalert";

function Login(props) {
   
    const baseURL = "http://localhost:3000/user/users";
    var [users, setUsers] = useState([]);
    var [modal, setModal] = useState(false);
    let history = useHistory();
  
  
    useEffect(() => {
      axios.get(baseURL).then(response => {
        setUsers(response.data.users);
        
      })
    }, []);
  
    const showModal=()=> {
        setModal(true);
    }

    const closeModal=()=> {
      axios.get(baseURL).then(response => {
        setUsers(response.data.users);
        
      })
        setModal(false);
    }
  
    const validacion = () => {
      var log = false;
      var username = document.getElementById("usernameEmail").value;
      var password = document.getElementById("password").value;
      var user = null
      users.map(u => {
        if ((username === u.name) && password === u.password) {
          user = u;
          localStorage.setItem("usuario", user._id)
          localStorage.setItem("nombre", user.name)
          log = true;
          history.push({pathname: '/home', user: u});
        }
      })
      if(!log){
        mensaje('Password or user incorrect','error')
      }
    }
    
    const mensaje = (title,type)=> {
      sweet({'title': title,
              'icon': type,
              })
  }


    return(
        <React.Fragment>
        {modal && <CreateUser closeModal={closeModal}/>}
        <div>
        <div className="container">
            <header>
                <h1 className="text-center">LOGIN</h1>
            </header>
            <div className="row justify-content-center align-items-center">
                <div className="col-auto">
                    <div className="form-group p-2">
                        <input type="text" className="form-control" id="usernameEmail" aria-describedby="emailHelp" placeholder="Username/Email"></input>
                    </div>
                    <div className="form-group p-2">
                        <input type="password" className="form-control" id="password" placeholder="Password"></input>
                    </div>
                    <button className="btn btn-primary" onClick={validacion}>Ingresar</button>
                        <p onClick={showModal}>Sing up</p>
                </div>
            </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default Login;