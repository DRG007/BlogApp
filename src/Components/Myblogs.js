import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { toast } from 'react-toastify'
import axios from 'axios'
import { createURL } from '../config'

const Myblogs = () => {
  const [myBlogs, setMyBlogs] = useState(undefined);
  const [blogid, setBlogid] = useState("");
  const navigate = useNavigate();
  const loadMyblogs = () => {
    const url = createURL("blogs/myBlogs");

    // read the token from session storage
    const token = sessionStorage["token"];
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(url, {
        headers: {
          "x-token": token,
        },
      })
      .then((response) => {
        const result = response.data;
        // console.log(result);
        if (result["status"] === "success") {
          setMyBlogs(result["data"]);
        } else {
          toast.error("error while loading your blogs");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(`error: `, error);
      });
  };

  useEffect(() => {
    loadMyblogs();
  }, []);

  const onDelete = (id) => {
    const url = createURL(`blogs/${id}`);
    const token = sessionStorage["token"];
    if (!token) {
      navigate("/");
      return;
    }
    axios.delete(url, {
      headers: {
        "x-token": token,
      },
      id,
    })
      .then((response) => {
        const result = response.data;
        console.log("result" + result)
        if (result["status"] === "success") {
          toast.success("Blog successfully deleted.")
          loadMyblogs();
        } else {
          toast.error("error while deleting your blog");
        }
      })
      .catch((error) => {
        console.log(`error: `, error)
      });
  }


  return (
    <>
      <Navbar />
      <div className='row' >
        <div className='col-1'></div>
        <div className='col-10'>
          <h1 className="h3 mt-4 fw-normal text-center">My Blogs</h1>
          {
            myBlogs && myBlogs.map((e, index) => {
              console.log(`title =${e.title} , details=${e.content} , id =${e.id}`)
              const Id = e.id;
              // setBlogid(Id);
              return (
                <div className="card mx-3 my-3 cardEffect" key={index} style={{ width: "18rem", display: "inline-block" }}>
                  <div className="card-body">
                    <h5 className="card-title">{e.title}</h5>
                    <p className="card-text">{e.content}</p>
                    {/* <Link to="#" style={{ textDecoration: 'none' }} className="card-link">Card link</Link> */}
                    <span >
                      <button className='btn btn-outline-danger'>
                        <svg id='share' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                          <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                        </svg>
                      </button>
                    </span>
                    <span className='mx-3'>
                      <Link to={`/Myblogs/Editblog/${Id}`} className='btn btn-outline-danger'>
                        <svg id='edit' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16" >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                      </Link>
                    </span>
                    <span>
                      <button className='btn btn-outline-danger'>

                        <svg id="delete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" onClick={() => onDelete(e.id)}>
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                      </button>
                    </span>

                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='col-1'></div>
      </div>
    </>

  )
}

export default Myblogs;