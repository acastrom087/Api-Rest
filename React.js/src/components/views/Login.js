function Login(props) {
    
    return(
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
                    <button className="btn btn-primary" onClick={props.loguear}>Ingresar</button>
                    
                </div>
            </div>
        </div>
    )
}

export default Login;