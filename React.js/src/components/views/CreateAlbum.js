import {useState} from 'react';
import axios from 'axios';
import './Modal.css'
function CreateAlbum(props) {

    var [album, setAlbum] = useState({
        name:'',
        userId: '',
        description: ''
    })
    const apiUrl = 'http://localhost:3000/album/add-album';
    
    const save= ()=> {
        const id = localStorage.getItem('usuario')
        var name = document.getElementById('nombre').value;
        var description = document.getElementById('description').value;
        console.log(id,name,description)
        setAlbum({
            ...album,
            name: name,
            userId: id,
            description: description
        })
        console.log(album);
        axios.post(apiUrl,album).then(response =>{
            console.log(response)
        })
        .catch(error => console.log(error))
        
        
    }

    return(
        <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Photo</h5>
                    <button type="button" className="close" onClick={props.closeModal}   data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" />
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre" />
                    <br />
                    <label htmlFor="nombre">Description</label>
                    <input className="form-control" type="text" name="description" id="description" />
                    <br />
                    <label htmlFor="capital_bursatil">Url</label>
                    <input className="form-control" type="text" name="url" id="url" />
                  </div>
                  <button className="btn btn-primary" onClick={save} >Add</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default  CreateAlbum;