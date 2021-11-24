import React, { useState, useEffect } from 'react';
import {  Link } from "react-router-dom";
import Navigation from '../Navigation';
import axios from 'axios';
import CreateAlbum from './CreateAlbum'


function Home(props) {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    const [add, setAdd] = useState(false);

   

    const id = localStorage.getItem('usuario');
    

    if (!id) window.location.href = '/';

    useEffect(() => {
        axios.get('http://localhost:3000/album/album/'+ id ).then(response => {
            setAllData(response.data.album);
            setFilteredData(response.data.album);
            
        })
    }, []);



    const handleFilter = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        result = allData.filter((data) => {
            return data.title.search(value) != -1;
        });
        setFilteredData(result);
    }

    const showModal =()=> {
        setAdd(true);

    }

    const closeModal =()=> {
        setAdd(false);
        
    }
    return (
        <React.Fragment>
            <Navigation />
            {add && <CreateAlbum closeModal ={closeModal} />}
            <br />
                <button className="btn btn-primary" onClick={showModal}>Add album</button>
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
                        <th scope="col">Open Album</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((value) => {
                        return (
                            <tr key={value._id}>
                                <td>{value.name}</td>
                                <td>{value.description}</td>
                                <td><Link to={`/fotos/${value._id}`}><button className="btn btn-primary">Abrir</button></Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default Home;