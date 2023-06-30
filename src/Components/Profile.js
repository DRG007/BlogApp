import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createURL } from '../config'
import Navbar from './Navbar'
import { toast } from 'react-toastify'
import photo from '../Images/User-Profile.png'

const Profile = () => {
    const [myProfile, setMyProfile] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const [image, setImage] = useState('')
    const [items, setItems] = useState("");

    const loadProfiledata = () => {
        const url = createURL("user/profile");

        const token = sessionStorage["token"];
        if (!token) {
            navigate("/");
            return;
        }
        axios.get(url, {
            headers: {
                "x-token": token,
            },
        })
            .then((response) => {
                const result = response.data;
                if (result["status"] === "success") {
                    const data = result["data"];
                    setEmail(data.email)
                    setFirstName(data.firstName)
                    setLastName(data.lastName)
                    setPhone(data.phone)
                    console.log(data.profileImage);
                    setItems(data)
                } else {
                    alert("error while loading your Profile");
                    navigate("/")
                }
            })
            .catch((error) => {
                console.log(`error: `, error)
            });
    };

    useEffect(() => {
        loadProfiledata();
    }, []);


    const onUpload = () => {

        const formData = new FormData();
        formData.append("image", image)

        const url = createURL("user/upload-profile-image");

        axios.post(url,
            formData, {
            headers: {
                'x-token': sessionStorage['token']
            }
        }).then(response => {
            const result = response.data

            if (result['status'] === 'success') {
                toast.success("profile added successfully")
                loadProfiledata()
            } else {
                toast.error("Something went wrong")
            }
        })

    }

    const onSaveChanges = () => {

        if (firstName.length === 0) {
            toast.error("please enter firstname")
        } else if (lastName.length === 0) {
            toast.error("please enter lastname");
        } else if (email.length === 0) {
            toast.error("please enter email");
        }
        else {
            const url = createURL("user/editprofile");
            const token = sessionStorage["token"]
            if (!token) {
                navigate("/");
                return;
            }
            axios.put(url, { firstName, lastName, email, phone }, { headers: { "x-token": token } })
                .then((response) => {
                    const result = response.data;
                    if (result["status"] === "success") {
                        toast.success("user data updated");
                        console.log("user data updated", url)
                        navigate("/Profile")

                    } else {
                        toast.error("error while user data updation");
                    }
                })
        }
    }


    return (
        <>
            <Navbar />
            <div className='row mt-2'>
                <div className='col'>
                </div>
                <div className='col othercard'>
                    <div className="form-signin w-100 m-auto">
                        {/* <h1 className="h3 mb-2 fw-normal text-center">My Profile</h1> */}
                        <div className='text-center'>
                            <div className="img mt-4">
                                <label htmlFor="input-file">
                                    {items && <img src={'http://localhost:4000/' + items.profileImage} alt="upload profile photo" height="120" width="120" style={{ borderRadius: '50%' }} />}
                                </label>
                            </div>
                            <div className="mb-3">
                                <div className='mt-3'>
                                    <input type='file' id="input-file" onChange={(e) => { setImage(e.target.files[0]) }} style={{ display: 'none' }} />

                                    <button onClick={onUpload} className="btn btn-success btn-sm">Upload image</button>
                                </div>
                            </div>
                            {/* <img src={photo} width="150" ></img> */}
                        </div>
                        <div >
                            <label htmlFor="name">First Name</label>
                            <input onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control mb-3" value={firstName}></input>
                        </div>
                        <div >
                            <label htmlFor="name">Last Name</label>
                            <input onChange={(e) => setLastName(e.target.value)} type="text" className="form-control mb-3" value={lastName}></input>
                        </div>
                        <div >
                            <label htmlFor="email">Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control mb-3" value={email}></input>
                        </div>
                        <div >
                            <label htmlFor="phoneno">Phone No.</label>
                            <input onChange={(e) => setPhone(e.target.value)} type="text" className="form-control mb-3" value={phone}></input>
                        </div>
                        <button onClick={onSaveChanges} className="btn btn btn-primary mt-2 mb-4" style={{ marginLeft: 140 }} >Save changes</button>

                    </div>
                </div>
                <div className='col'></div>
            </div>
        </>
    )
}

export default Profile