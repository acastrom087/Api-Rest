import axios from 'axios';
import './Modal.css'
import sweet from "sweetalert";
function CreateAlbum(props) {


    var apiUrl = '';
    var message = '';

    const Save = () => {
        let album = {}
        if (props.album) {
            const userId = props.album.userId;
            const id = props.album._id;
            var name = document.getElementById("name").value;
            var description = document.getElementById("description").value;
            apiUrl = 'http://localhost:3000/album/edit-album';
            message = 'Album edited';
            album = {
                name: name,
                userId: userId,
                description: description,
                id: id
            }
        } else {
            const id = localStorage.getItem('usuario')
            var name = document.getElementById("name").value;
            var description = document.getElementById("description").value;
            apiUrl = 'http://localhost:3000/album/add-album';
            message = 'Album created'
            album = {
                name: name,
                userId: id,
                description: description
            }
        }
        if(album.name =='' || album.description == '') {
            const aviso = document.querySelector('#aviso')
            aviso.textContent = 'Complete los campos'
        }else{
        axios.post(apiUrl, album)
            .then(response => {
                mensaje(message, 'success')
                props.closeModal()
            })
            .catch(error => mensaje('Error', 'error'))
        }

    }
    const mensaje = (title, type) => {
        sweet({
            'title': title,
            'icon': type
        })
    }
    console.log(props.album)

    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Album</h5>
                        <button type="button" className="btn-close" onClick={props.closeModal} data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            {/* <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" />
                    <br /> */}
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="name" id="name" defaultValue={props.album ? props.album.name : ''} />
                            <br />
                            <label htmlFor="nombre">Description</label>
                            <input className="form-control" type="text" name="description" id="description" defaultValue={props.album ? props.album.description : ''} />
                        </div>
                        <br/><button className="btn btn-primary" onClick={Save} >Add</button>
                        <br/>
                        <p id='aviso'></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateAlbum;