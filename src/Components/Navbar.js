import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { createURL } from '../config';

export default function Navbar() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");

    const getProfileData = () => {
        const url = createURL("user/profile");
        const token = sessionStorage["token"]
        if (!token) {
            navigate("/");
            return;
        }

        axios.get(url, { headers: { "x-token": token } })
            .then((response) => {
                const result = response.data;
                // console.log(result['data'])
                // setMyProfile(result["data"]);
                const data = result["data"];
                setFirstName(data.firstName)

            })
            .catch((error) => {
                console.log(`error: `, error);
            });

    };

    useEffect(() => {
        getProfileData();
    }, []);

    function onLogout() {
        sessionStorage.removeItem('firstName')
        sessionStorage.removeItem('lastName')
        sessionStorage.removeItem('token')
        navigate('/')
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/Dashboard">Blog.com</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/Dashboard">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/Myblogs">My blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/Addblog">Add Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/Profile">Profile</Link>
                        </li>
                        <li className="nav-item position-absolute end-0" style={{ marginRight: 100 }} >
                            <Link className="nav-link active" to="">Welcome, {firstName}</Link>
                        </li>
                        <li className="nav-item position-absolute end-0" >
                            <button className="btn btn-danger mx-3" style={{color:'white'}} onClick={onLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>)
}
