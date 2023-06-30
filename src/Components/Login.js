import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { createURL } from '../config'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onSignin = () => {

        if (email.length === 0) {
            toast.error("please enter email");
          } else if (password.length === 0) {
            toast.error("please enter password");
          } else {
            const url = createURL("user/signin");
            axios
              .post(url, {
                email,
                password,
              })
              .then((response) => {
                const result = response.data;
                console.log(result);
                if (result["status"] === "success") {
                  navigate("Dashboard");
                  const { firstName, lastName, token } = result["data"];
      
                  // save the values in the session storage
                  sessionStorage["firstName"] = firstName;
                  sessionStorage["lastName"] = lastName;
                  sessionStorage["token"] = token;
      
                  // go to the dashboard
                  navigate("/Dashboard");
                } else {
                  toast.error("Invalid email or password");
                }
              });
          }
    }

    const onSignup = () => {
        navigate('/Signup')
    }

    return (

        <div className='row mt-5'>
            <div className='col'>
            </div>
            <div className='col othercard'>
                <div className="form-signin w-100 m-auto">
                    <div>
                        <h1 className="h3 mb-3 fw-normal text-center mt-4 ">Sign in</h1>
                        <div className="form-floating">
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control mb-3" id="floatinginput" placeholder="name@example.com"></input>
                            <label htmlFor="floatinginput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control mb-1" id="floatingpassword" placeholder="Password"></input>
                            <label htmlFor="floatingpassword">Password</label>
                        </div>
                        {/* <div className="checkbox mb-3">
                <label> Remember me 
                    <input type="checkbox" >Remember me</input>
                </label>
            </div> */}
                        <div className='text-center'>
                        <span>Don't have an account yet?</span>
                        <button onClick={onSignup} type="button" className="btn btn-link">Sign up now</button>
                        </div>
                        <button onClick={onSignin} className="w-100 btn btn-lg btn-primary mt-3 mb-4" >Sign in</button>
                    

                    </div>
                </div>
            </div>
            <div className='col'></div>
        </div>


    )
}
export default Login;