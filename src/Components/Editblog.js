import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { createURL } from '../config'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Editblog = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();




  const getBloginfo = () => {
    const url = createURL(`blogs/${id}`);
    const token = sessionStorage["token"]
    if (!token) {
      navigate("/");
      return;
    }

    axios.get(url, { headers: { "x-token": token } })
      .then((response) => {
        const result = response.data;
        if (result["status"] === "success") {
          // setMyProfile(result["data"]);
          const data = result["data"];
          console.log(data);

          setTitle(data[0].title);
          setContent(data[0].content);

        } else {
          toast.error("error while loading blog");
          navigate("/Myblogs");
        }
      })
      .catch((error) => {
        console.log(`error: `, error);
      });
  };

  useEffect(() => {
    getBloginfo();
  }, []);

  const onSave = () => {
    console.log(title)
    console.log(content)
    if (title.length === 0) {
      toast.error("please enter title of blog")
    } else if (content.length === 0) {
      toast.error("please enter content for blog");
    } else {
      const url = createURL(`blogs/${id}`);
      const token = sessionStorage["token"]
      axios.put(url, {
        title, content,
      }, { headers: { 'x-token': token } }
      )
        .then((response) => {
          const result = response.data;
          console.log("result" + result)
          if (result["status"] === "success") {
            toast.success("Blog successfully updated.")
            navigate("/Myblogs")
          } else {
            toast.error("error while updating your blog");
          }
        })
        .catch((error) => {
          console.log(`error: `, error)
        });
    }
  }


  const onCancel = () => {
    navigate("/Myblog")
  }

  return (
    <>
      <Navbar />
      <div className='row'>
        <div className='col'></div>
        <div className='col '>
          <h1 className="h3 mt-3 fw-normal text-center">Edit blog</h1>

          <div>
            <label htmlFor="title">Title</label>
            <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control mt-1 mb-3" value={title}></input>
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea onChange={(e) => setContent(e.target.value)} col="30" className="form-control mt-1" style={{ height: '250px', resize: 'none' }} value={content}></textarea>
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

export default Editblog;