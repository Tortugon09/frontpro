import logo from "../assets/logo.png"
import logojak from "../assets/logojak1.svg"
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {Context} from "../context/context.jsx";
import axios from "axios";

export default function Login() {

    const {login,token, setToken, setUserR,userR,setOpen} = useContext(Context);
    const [user, setuser] = useState({
        email: "",
        lastName: "",
        name: "",
        password: "",
        phone: ""
    })

    const handleChange = (e) => {
        setuser({...user,[e.target.name]: e.target.value})
        console.log(user)
    }

    console.log(token)

    const loginDates= async(user) => {
        const { email, lastName, name, password,phone } = user;
        await axios.post('http://18.117.225.35/api/login', { email ,lastName , name, password , phone })
            .then( function (response) {
                console.log(response.data.jwt);
                setToken(response.data.jwt)
                navigate("/home")
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const handlesubmit = (e) => {
        e.preventDefault()
        loginDates(user)
        if (token === "")  {
            console.log("error")
        } else {
            console.log(userR)
            loginDates(user)

        }
    }

    const navigate = useNavigate();
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-1/2 w-auto"
                        src={logo}
                        alt="mabe logo"
                    />
                    <h2 className="flex flex-col items-center justify-center mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        <img
                            className="mx-3 h-auto w-28"
                            src={logojak}
                            alt="JAK"
                        />
                        Aguitas Bien
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handlesubmit} method="POST">
                        <div>
                            <div className="flex ">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Email address
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-white hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <Link className="text-white" to='/Register'>Registrate Aqui</Link>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="text-white flex w-full justify-center rounded-md bg-bgcolor2 px-3 py-1.5 leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
