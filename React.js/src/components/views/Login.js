import CreateUser from './CreateUser';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import sweet from "sweetalert";
import Mail from './Mail';
import jsonwebtoken from 'jsonwebtoken';

function Login(props) {
   
    const baseURL = "http://localhost:3000/user/login";
    var [users, setUsers] = useState([]);
    var [modal, setModal] = useState(false);
    var [mail, setMail] = useState(false);
    let history = useHistory();
  
    const showModal=()=> {
        setModal(true);
    }
  

    const closeModal=()=> {
        setModal(false);
    }

    const showMail=()=> {
      setMail(true);
    }

    const closeMail=()=> {
      setMail(false);
    }
  
    const validacion = () => {
      axios.post(baseURL, {
          email: document.getElementById('usernameEmail').value,
          password: document.getElementById('password').value
      }).then(res => {
        console.log(res.data.token);
        var user = jsonwebtoken.decode(res.data.token, 'fhbfgh615g74d85th4t4454htHTRGTf56fsd56Hg').user;
        console.log(user);
        localStorage.setItem('usuario', user._id);
        localStorage.setItem('nombre', user.name);
        history.push({pathname: '/home'})
      })
        .catch(err => console.log(err))
      

      //   cookie('token', res, {
      //     httpOnly: true,
      //   }))
      
      // console.log();
    }
    
    const mensaje = (title,type)=> {
      sweet({'title': title,
              'icon': type,
              })
  }


    return(
        <React.Fragment>
          {mail && <Mail closeModal= {closeMail} />}
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
                    <hr/><button className="btn btn-primary" onClick={showModal}>Registrarse</button>
                    <br/><button className="btn btn-link" onClick={showMail}>Recuperar contraseña</button>
                </div>
            </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default Login;