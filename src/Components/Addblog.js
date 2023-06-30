import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { createURL } from '../config'
import { useNavigate } from 'react-router-dom'

const Addblog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const onSave = () => {
        if (title.length === 0) {
            toast.error("enter title");
        } else if (content.length === 0) {
            toast.error("enter blog content");
        } else {
            const url = createURL("blogs");
            axios
                .post(
                    url,
                    {
                        title,
                        content,
                    },
                    {
                        headers: {
                            "x-token": sessionStorage["token"],
                        },
                    }
                )
                .then((response) => {
                    const result = response.data;
                    if (result["status"] === "success") {
                        toast.success("successfully added an blog");
                        navigate("/Myblogs");
                    } else {
                        toast.error("error while adding blog");
                    }
                });
        }
    };

   const onCancel = () =>{
    navigate("/Dashboard")
   }

    return (
        <>
            <Navbar />
            <div className='row'>
                <div className='col'></div>
                <div className='col ' >
                    <h1 className="h3 mt-3 fw-normal text-center">Create new blog</h1>

                    <div className="form-floating">
                        <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control mt-3" id="title" placeholder="title"></input>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating">
                        <textarea onChange={(e) => setContent(e.target.value)} col="30" className="form-control mt-3" style={{ height: '250px', resize: 'none' }} id="content" placeholder="content"></textarea>
                        <label htmlFor="content">Content</label>
                    </div>
                    <div className='text-center mt-3'>
                        <button onClick={onSave} className='btn btn-success' style={{ marginRight: 5 }}>Save</button>
                        <button onClick={onCancel} className='btn btn-danger' style={{ marginLeft: 5 }}>Cancel</button>
                    </div>
                </div>
                <div className='col'></div>
            </div>
        </>


    )
}

export default Addblog;