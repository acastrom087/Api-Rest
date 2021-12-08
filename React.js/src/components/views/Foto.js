import Navigation from "../Navigation";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import CreatePhoto from "./CreatePhoto";
import sweet from "sweetalert";

function Foto(props) {

    const [photos, setPhotos] = useState([]);
    const [allData, setAllData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [link, setLink] = useState();
    const [photo, setPhoto] = useState([]);

    const deleteUrl = 'http://localhost:3000/photo/delete-photo/'
    const { id } = useParams();

    const cargarPhotos = () => {
        axios.get('http://localhost:3000/photo/photo/' + id)
            .then((response) => {
                setPhotos(response.data.photos);
                setAllData(response.data.photos);

            })
            .catch((err) => mensaje('Error', 'error'));
    }

    useEffect(() => {
        cargarPhotos();
    }, [])

    const handleFilter = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        result = allData.filter((data) => {
            return data.title.search(value) != -1;
        });
        setPhotos(result);
    }

    const verModal = (url) => {
        setShowModal(true);
        setLink(url);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const closeModal1 = () => {
        setShowModal1(false);
        cargarPhotos();
    }

    const verModal1 = (photo) => {
        setPhoto(photo);
        setShowModal1(true);
    }

    const eliminar = (id) => {
        axios.post(deleteUrl, { id})
        .then(response =>{ console.log('Eliminado') 
                sweet('Deleted Photo','', 'success');
                cargarPhotos()})
        .catch(err => mensaje('Error', 'error'))

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
    const mensaje = (title,type)=> {
        sweet({'title': title,
                'icon': type,
                })
    }

    return (
        <React.Fragment>
            <Navigation />
            {showModal1 && <CreatePhoto closeModal={closeModal1} photo={photo} />}
            {showModal && <Modal closeModal={closeModal} url={link} />}
            <br />
            <button className="btn btn-primary" onClick={()=>verModal1(null)}>Add photo</button>
            <form className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search" onChange={(event) => handleFilter(event)}
                />
            </form>
            <hr />
            <table className="table table-success table-hover">
                <thead>
                    <tr>
                        <th scope="col">Photo Title</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Open Photo</th>


                    </tr>
                </thead>
                <tbody>
                    {photos.map((value) => {
                        return (
                            <tr key={value._id}>
                                <td>{value.name}</td>
                                <td><img src={value.url} /></td>
                                <td><button onClick={() => verModal(value.url)} className="btn btn-primary">Ver Foto</button>
                                    <button type="button" onClick={()=>message(value._id)} className="btn btn-danger">Eliminar</button>
                                    <button type="button" onClick={()=>verModal1(value)} className="btn btn-dark">Editar</button></td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </React.Fragment>
    );
}
export default Foto;
