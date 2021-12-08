import axios from 'axios';
import sweet from "sweetalert";
import './Modal'
function EditUser(props) {

    const apiUrl = 'http://localhost:3000/user/edit-user';
    
    const save = () => {
        var name = document.getElementById("name").value;
        var lastName = document.getElementById("lastName").value;
        var email = document.getElementById("email").value;
        var birthday = document.getElementById("birthday").value;
        var gender = document.getElementById("gender").value;
        var id = props.usuario._id
        if(name == '' || email == ''){
        const aviso = document.querySelector('#aviso')
        aviso.textContent = 'Complete los campos'
        }else{
            let user ={
                name:name,
                lastName: lastName,
                email: email,
                password: props.usuario.password,
                birthday: birthday,
                gender: gender,
                id
            }
            axios.post(apiUrl, user)
            .then(response =>{
                mensaje('User Edited', 'success')
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
                        <h5 className="modal-title" id="exampleModalLabel">EditUser</h5>
                        <button type="button" className="close" onClick={props.closeModal} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" readOnly="readOnly" name="id" id="id"  />
                            <br />
                            <label htmlFor="nombre">Name</label>
                            <input className="form-control" type="text" name="name" id="name" defaultValue={props.usuario.name} />
                            <br />
                            <label htmlFor="nombre">LastName</label>
                            <input className="form-control" type="text" name="lastName" id="lastName" defaultValue={props.usuario.lastName} />
                            <br />
                            <label htmlFor="nombre">Email</label>
                            <input className="form-control" type="text" name="email" id="email" defaultValue={props.usuario.email} />
                            <br />
                            <label htmlFor="nombre">birthday</label>
                            <input className="form-control" type="date" name="birthday" id="birthday" defaultValue={props.usuario.birthday} />
                            <br />
                            <label htmlFor="nombre">Gender</label>
                            <input className="form-control" type="text" name="gender" id="gender" defaultValue={props.usuario.gender} />
                        </div>
                        <button className="btn btn-primary" onClick={save} >Edit</button>
                        <br/>
                        <p id='aviso'></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser;