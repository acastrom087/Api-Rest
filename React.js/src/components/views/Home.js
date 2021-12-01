import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navigation from '../Navigation';
import axios from 'axios';
import CreateAlbum from './CreateAlbum'
import sweet from "sweetalert";
import './home.css'
import EditUser from './EditUser';

function Home(props) {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    const [add, setAdd] = useState(false);
    const [album, setAlbum] = useState([])
    const [editUser, setEditUser] = useState(false);

    const deleteUrl = 'http://localhost:3000/album/delete-album'
    const id = localStorage.getItem('usuario');
    
    const usuario = props.location.user
    console.log(usuario)

    if (!id) window.location.href = '/';

    const cargarAlbum = () => {
        axios.get('http://localhost:3000/album/album/' + id).then(response => {
            setAllData(response.data.album);
            setFilteredData(response.data.album)
        });
    }

    useEffect(() => {
        cargarAlbum();
    }, []);

    const eliminar = (albumId) => {
        console.log(albumId);
        axios.post(deleteUrl, { albumId })
            .then(response => {
                sweet('Album deleted','','success')
                cargarAlbum();
            })
            .catch(err => { console.log(err) })
    }

    const handleFilter = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        result = allData.filter((data) => {
            return data.title.search(value) != -1;
        });
        setFilteredData(result);
    }

    const showModal = (album) => {
        setAlbum (album);
        setAdd(true);
    }

    const closeModal = () => {
        cargarAlbum();
        setAdd(false);
    }

    const message=(id)=> {
        sweet({
            title: 'Delete',
            text: 'Are you sure you want to delete?',
            icon: 'warning',
            buttons: ["Cancel", "Delete"],
         })
         .then(result=>{
             if(result)
             eliminar(id)
         })
        }
    const showEditUser =()=>{
        setEditUser(true);
    }

    const closeEditUser =()=>{
        setEditUser(false);
    }
    

    return (
        <React.Fragment>
            <Navigation />
            {editUser && <EditUser closeModal={closeEditUser} usuario={usuario}/>}
            <button  id='settings' onClick={showEditUser} >Settings</button>
            
            {add && <CreateAlbum closeModal={closeModal} album={album} />}
            <br />
            <button className="btn btn-primary" onClick={() =>showModal(null)}>Add album</button>
            <form className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search" onChange={(event) => handleFilter(event)}
                />

            </form>
            <hr />
            <table className="table table-success table-hover">
                <thead>
                    <tr>
                        <th scope="col">Album Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((value) => {
                        return (
                            <tr key={value._id}>
                                <td>{value.name}</td>
                                <td>{value.description}</td>
                                <td><Link to={`/foto/${value._id}`}><button className="btn btn-primary">Abrir</button></Link>
                                    <button type="button" onClick={() => message(value._id)} className="btn btn-danger">Eliminar</button>
                                    <button type="button" onClick={()=>showModal(value)} className="btn btn-dark">Editar</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default Home;