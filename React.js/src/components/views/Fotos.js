import Navigation from "../Navigation";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";

function Fotos(props) {

    const [photos, setPhotos] = useState([]);
    const [allData, setAllData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [link, setLink] = useState();

    const { id } = useParams();
    useEffect(() => {
        axios.get('http://localhost:3000/photo/photo/' + id)
            .then((response) => {
                setPhotos(response.data.photos);
                setAllData(response.data.photos);
                
            });
    },[])
    
    const handleFilter = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        result = allData.filter((data) => {
            return data.title.search(value) != -1;
        });
        setPhotos(result);
    }

    const verModal=(url)=>{
        setShowModal(true);
        setLink(url);
    }

   const closeModal =()=>{
       setShowModal(false);
   }


    console.log(props);

    return (
        <React.Fragment>
            <Navigation />
            {showModal && <Modal closeModal={closeModal} url={link} />}
            <br />
            <form className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search" onChange={(event) => handleFilter(event)} 
                />
            </form>
            <hr />
            <table className="table table-success table-hover">
                <thead>
                    <tr>
                        <th scope="col">Photo Title</th>
                        <th scope="col">ThumbnailUrl</th>
                        <th scope="col">Open Photo</th>
                       
                        
                    </tr>
                </thead>
                <tbody>
                    {photos.map((value) => {
                        return (
                            <tr key={value._id}>
                                <td>{value.name}</td>
                                <td><img src={value.url}/></td>
                                <td><button onClick={()=>verModal(value.url)}  className="btn btn-primary">Ver Foto</button></td>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </React.Fragment>
    );
}
export default Fotos;
