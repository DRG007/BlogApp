import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { toast } from 'react-toastify'
import axios from 'axios'
import { createURL } from '../config'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    // const data = [{ title: "362,758 Tesla Vehicles Recalled To Fix Self-Driving Software", content: "Tesla cars keep getting into trouble. Now, the company has recalled 3.6 Lakh vehicles due to a self-driving software glitch. It is quite common for...", src: "https://www.carblogindia.com/tesla-vehicles-recalled-self-driving-software/" },
    // { title: "MS Dhoni Buys a Humble TVS Ronin Worth Rs 1.7 lakh", content: `Just days after being spotted with his TVS Apache RR310, former Indian skipper MS Dhoni has now purchased the TVS Ronin motorcycle  If there's one...`, src: "https://www.carblogindia.com/ms-dhoni-tvs-ronin/" },
    // { title: "The Only Indian to Own Bugatti Chiron – Bought Car for Father", content: "An Indian man has bought a brand new Bugatti Chiron Super Sports Car for his father. Let's take a look at his impressive car collection Many crazy rich Indians...", src: "https://www.carblogindia.com/indian-man-bugatti-chiron/" },
    // { title: "SUV Remains Most Popular Car Body Type in South Africa", content: `The 2022 AutoTrader Annual Car Industry report offers some incredible insights into automobile industry trends across the world. SUV has been reported as the...`, src: "https://www.carblogindia.com/suv-most-popular-car-body-type-south-africa/" }, { title: "362,758 Tesla Vehicles Recalled To Fix Self-Driving Software", content: "Tesla cars keep getting into trouble. Now, the company has recalled 3.6 Lakh vehicles due to a self-driving software glitch. It is quite common for...", src: "https://www.carblogindia.com/tesla-vehicles-recalled-self-driving-software/" },
    // { title: "MS Dhoni Buys a Humble TVS Ronin Worth Rs 1.7 lakh", content: `Just days after being spotted with his TVS Apache RR310, former Indian skipper MS Dhoni has now purchased the TVS Ronin motorcycle  If there's one...`, src: "https://www.carblogindia.com/ms-dhoni-tvs-ronin/" },
    // { title: "The Only Indian to Own Bugatti Chiron – Bought Car for Father", content: "An Indian man has bought a brand new Bugatti Chiron Super Sports Car for his father. Let's take a look at his impressive car collection Many crazy rich Indians...", src: "https://www.carblogindia.com/indian-man-bugatti-chiron/" },
    // { title: "SUV Remains Most Popular Car Body Type in South Africa", content: `The 2022 AutoTrader Annual Car Industry report offers some incredible insights into automobile industry trends across the world. SUV has been reported as the...`, src: "https://www.carblogindia.com/suv-most-popular-car-body-type-south-africa/" }]

    const [allBlogs, setAllBlogs] = useState(undefined);
    const navigate = useNavigate();
  const loadAllblogs = () => {
    const url = createURL("blogs/allBlogs");

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
        console.log(result);
        if (result["status"] === "success") {
          setAllBlogs(result["data"]);    
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
    loadAllblogs();
  }, []);
    return (
        <>
            <Navbar />
            <div className='row'>
                <div className='col-1'></div>
                <div className='col-10 '>
                <h1 className="h3 mt-4 fw-normal text-center">Blogs</h1>
                    {
                        allBlogs && allBlogs.map((e, id) => {
                            return (
                                <div className="card mx-3 my-3 cardEffect" key={id} style={{ width: "18rem", display: "inline-block" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{e.title}</h5>
                                        <p className="card-text">{e.content}</p>
                                        {/* <Link to="#" style={{ textDecoration: 'none' }} className="card-link">Card link</Link> */}
                                        <span>
                                        <button className='btn btn-outline-danger'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-hand-thumbs-up " viewBox="0 0 16 16">
                                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                            </svg>
                                            </button>
                                        </span>
                                        <span className='mx-3'>
                                        <button className='btn btn-outline-danger'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                                                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
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

export default Dashboard