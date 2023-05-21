import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authActionLogin } from '../../redux/actions/auth.action'
import { notify } from '../../utils/toast'
import "./login.css"

function Login() {

    let errors = useSelector(e => e.allStates.loginErr.errors)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(authActionLogin({ email, password }))
    }

    

    return (
        <>
            {/* <!-- Section: Design Block --> */}
            <section className="background-radial-gradient overflow-hidden myAuth">

                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight font-weight-bold" style={{ color: "hsl(218, 81%, 95%)" }}>
                                The best place <br />
                                <span style={{ color: "hsl(218, 81%, 75%)" }}>to preserve your Memory & Art</span>
                            </h1>
                            <div className="d-flex flex-column align-items-end ">

                                <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                                    "Write it. Shoot it. Publish it. Crochet it. Sauté it. Whatever. MAKE."
                                </p>
                                <p className=' mb-4 opacity-70 ' style={{ color: "hsl(218, 81%, 85%)", textAlign: "right" }}>Joss Whedon</p>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <form>

                                        {/* <!-- Email input --> */}
                                        <div className="form-outline mb-4">
                                            <input type="email" id="form3Example3" className="form-control py-3" placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} />
                                            {/* <label className="form-label" htmlFor="form3Example3">Email address</label> */}
                                        </div>

                                        {/* <!-- Password input --> */}
                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example4" className="form-control py-3" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                                            {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
                                        </div>


                                        {/* <!-- Submit button --> */}
                                        <button type="submit" onClick={handleLogin} className="btn btn-primary btn-block mb-4 w-100">
                                            Login
                                        </button>

                                    </form>
                                    {errors.map((e, i) => (
                                        <p className='text-center text-danger m-0' key={i}>
                                            <img src="https://img.icons8.com/color/48/null/break--v4.png" height="30px" className='mx-2' />{e.msg}
                                        </p>
                                    ))}
                                    <div onClick={() => document.getElementById("signup-btn").click()}>
                                        <Link to='/signup'>Create an account?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Section: Design Block --> */}
        </>
    )
}

export default Login