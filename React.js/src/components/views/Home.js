import React, { useState, useEffect } from 'react';
import {  Link } from "react-router-dom";
import Navigation from '../Navigation';
import axios from 'axios';


function Home(props) {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);

   

    const id = localStorage.getItem('usuario');

    if (!id) window.location.href = '/';

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/albums?userId=' + id).then(response => {
            setAllData(response.data);
            setFilteredData(response.data);
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

    return (
        <React.Fragment>
            <Navigation />
            <br />
            <form className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search" onChange={(event) => handleFilter(event)}
                />
            </form>
            <hr />
            <table className="table table-success table-hover">
                <thead>
                    <tr>
                        <th scope="col">Album Title</th>
                        <th scope="col">Open Album</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((value) => {
                        return (
                            <tr key={value.id}>
                                <td>{value.title}</td>
                                <td><Link to={`/fotos/${value.id}`}><button className="btn btn-primary">Abrir</button></Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default Home;