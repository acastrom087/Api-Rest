import axios from 'axios';
import sweet from "sweetalert";
function Mail(props) {

    const sendMail = () => {
        console.log('lo presioe')
        var mail = document.getElementById("mail").value;
        axios.post('http://localhost:3000/mail/sendMail', { mail: mail })
            .then(response => {
                console.log(response); if (response.data == null) {
                    mensaje('El correo no existe', 'error')
                } else {
                    mensaje('Contraseña cambiada', 'success')
                    props.closeModal()
                }
            })
            .catch(response => { mensaje('Error', 'error') })
    }

    const mensaje = (title, type) => {
        sweet({
            'title': title,
            'icon': type,
        })
    }

    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Recuperar Contraseña</h5>
                        <button type="button" className="btn-close" onClick={props.closeModal} data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group p-2">
                            <input type="email" className="form-control" id="usernameEmail" aria-describedby="emailHelp" placeholder="Email" id="mail"></input>
                            <br/><button className="btn btn-primary" onClick={sendMail}>Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mail;