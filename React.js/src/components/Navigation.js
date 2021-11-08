import React from "react";
import {NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function Navigation() {
    
    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/home">Home</NavLink>
                <p className="navbar-brand">Welcome {localStorage.getItem("nombre")} </p>
                <NavLink className="navbar-brand" to="#" onClick={logout}>Logout</NavLink>
            </nav>
        </div>
    );
}

export default Navigation;