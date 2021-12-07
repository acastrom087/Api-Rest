import axios from 'axios';
import sweet from "sweetalert";
function CreateUser(props) {

    const apiUrl = 'http://localhost:3000/user/add-user';

    const save = () => {
        var name = document.getElementById("name").value;
        var lastName = document.getElementById("lastName").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var rePassword = document.getElementById("rePassword").value;
        var birthday = document.getElementById("birthday").value;
        var gender = document.getElementById("gender").value;
        if(password != rePassword){
            mensaje('The password are diferent','error')
        }else{
            let user ={
                name:name,
                lastName: lastName,
                email: email,
                password: password,
                birthday: birthday,
                gender: gender
            }
            axios.post(apiUrl, user)
            .then(response =>{
                mensaje('User Created', 'success')
                props.closeModal()
            })
            .catch(error =>{
                mensaje('Error', 'error')
            })
        }

    }
    const mensaje = (title,type)=> {
        sweet({'title': title,
                'icon': type,
                })
    }

    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">CreateAlbum</h5>
                        <button type="button" className="close" onClick={props.closeModal} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" readOnly="readOnly" name="id" id="id" />
                            <br />
                            <label htmlFor="nombre">Name</label>
                            <input className="form-control" type="text" name="name" id="name" />
                            <br />
                            <label htmlFor="nombre">LastName</label>
                            <input className="form-control" type="text" name="lastName" id="lastName" />
                            <br />
                            <label htmlFor="nombre">Email</label>
                            <input className="form-control" type="text" name="email" id="email" />
                            <br />
                            <label htmlFor="nombre">Password</label>
                            <input className="form-control" type="text" name="password" id="password" />
                            <br />
                            <label htmlFor="nombre">RePassword</label>
                            <input className="form-control" type="text" name="rePassword" id="rePassword" />
                            <br />
                            <label htmlFor="nombre">birthday</label>
                            <input className="form-control" type="date" name="birthday" id="birthday" />
                            <br />
                            <label htmlFor="nombre">Gender</label>
                            <input className="form-control" type="text" name="gender" id="gender" />
                        </div>
                        <button className="btn btn-primary" onClick={save} >Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateUser;