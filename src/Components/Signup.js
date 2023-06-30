import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { createURL } from '../config'
import { useNavigate } from 'react-router-dom'
function Signup() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const onSignup = () => {

      if (firstName.length === 0) {
        toast.error("please enter firstname")
    } else if (lastName.length === 0) {
        toast.error("please enter lastname");
    } else if (email.length === 0) {
        toast.error("please enter email");
    } else if (password !== confirmPassword) {
        toast.error("password does not match");
    } 
    else {
        const url = createURL("user/signup");
        console.log("user inserted",url)
        axios.post(url, {firstName,lastName, email, password,confirmPassword })
            .then((response) => {
                const result = response.data;
                if (result["status"] === "success") {
                    toast.success("Register successfully");
                    navigate("/")

                }else if(result["error"] === "User already Exist"){
                    toast.warn("Email already registered")

                }
                    else{
                    toast.error("error while register");
                }
            })
    }
    }

    const onSignin = () =>{
        navigate('/')
    }


    return (

        <div className='row mt-5'>
            <div className='col'>
            </div>
            <div className='col othercard'>
                <div className="form-signin w-100 m-auto">
                    <div>
                        <h1 className="h3 mb-3 fw-normal text-center mt-4">Sign up</h1>
                        <div className="form-floating">
                            <input onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control mb-3" id="floatinginput1" placeholder="firstname"></input>
                            <label htmlFor="floatinginput1">First Name</label>
                        </div>
                        <div className="form-floating">
                            <input onChange={(e) => setLastName(e.target.value)} type="text" className="form-control mb-3" id="floatinginput2" placeholder="lastname"></input>
                            <label htmlFor="floatinginput2">Last Name</label>
                        </div>
                        <div className="form-floating">
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control mb-3" id="floatinginput3" placeholder="name@example.com"></input>
                            <label htmlFor="floatinginput3">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control mb-3" id="floatingpassword1" placeholder="Password"></input>
                            <label htmlFor="floatingpassword1">Enter Password</label>
                        </div>
                        <div className="form-floating">
                            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control mb-1" id="floatingpassword2" placeholder="Password"></input>
                            <label htmlFor="floatingpassword2">Confirm Password</label>
                        </div>
                        <span>Already have an account</span>
                        <button onClick={onSignin} type="button" className="btn btn-link">Sign in</button>

                        <button onClick={onSignup} className="w-100 btn btn-lg btn-primary mt-3 mb-4" type="submit">Sign up</button>

                    </div>
                </div>
            </div>
            <div className='col'></div>
        </div>


    )
}
export default Signup;