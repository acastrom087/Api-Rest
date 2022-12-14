import axios from 'axios';
import { useParams } from "react-router-dom";
import sweet from "sweetalert";
import './Modal.css'
function CreatePhoto(props) {

    var apiUrl = ' ';
    const { id } = useParams();

    const save = () => {
        var photo = {}
        var message = '';
        if (props.photo) {
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value
            const url = document.getElementById('url').value;
            const albumId = props.photo.albumId;
            const id = props.photo._id;
            message = 'Photo edited'
            apiUrl = 'http://localhost:3000/photo/edit-photo'
            photo = {
                name: name,
                albumId: albumId,
                description: description,
                url: url,
                id: id
            }
            console.log(photo)
        } else {
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value
            const url = document.getElementById('url').value;
            apiUrl = 'http://localhost:3000/photo/add-photo';
            message = 'Photo created'
            photo = {
                name: name,
                albumId: id,
                description: description,
                url: url
            }
        }
        if(photo.name =='' || photo.description == ''){
            const aviso = document.querySelector('#aviso')
            aviso.textContent = 'Complete los campos'
        }else{
        console.log(photo)
        axios.post(apiUrl, photo)
            .then(response => {
                mensaje(message, 'success');
                props.closeModal()
            })
            .catch(error => mensaje('Error', 'error'))
        }
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
                        <h5 className="modal-title" id="exampleModalLabel">Nueva Foto</h5>
                        <button type="button" className="btn-close" onClick={props.closeModal} data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="name" id="name" defaultValue={props.photo ? props.photo.name : ''} />
                            <br />
                            <label htmlFor="nombre">Description</label>
                            <input className="form-control" type="text" name="description" id="description" defaultValue={props.photo ? props.photo.description : ''} />
                            <br />
                            <label htmlFor="nombre">Url</label>
                            <input className="form-control" type="text" name="url" id="url" defaultValue={props.photo ? props.photo.url : ''} />
                        </div>
                        <br/><button className="btn btn-primary" onClick={save} >Agregar</button>
                        <p id='aviso'></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreatePhoto;