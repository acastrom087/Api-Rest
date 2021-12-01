import axios from 'axios';
import { useParams } from "react-router-dom";
import sweet from "sweetalert";

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
        console.log(photo)
        axios.post(apiUrl, photo)
            .then(response => {
                mensaje(message, 'success');
                props.closeModal()
            })
            .catch(error => { console.log(error) })
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
                        <h5 className="modal-title" id="exampleModalLabel">Photo</h5>
                        <button type="button" className="close" onClick={props.closeModal} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            {/* <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" />
                    <br /> */}
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="name" id="name" defaultValue={props.photo ? props.photo.name : ''} />
                            <br />
                            <label htmlFor="nombre">Description</label>
                            <input className="form-control" type="text" name="description" id="description" defaultValue={props.photo ? props.photo.description : ''} />
                            <br />
                            <label htmlFor="nombre">Url</label>
                            <input className="form-control" type="text" name="url" id="url" defaultValue={props.photo ? props.photo.url : ''} />
                        </div>
                        <button className="btn btn-primary" onClick={save} >Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreatePhoto;