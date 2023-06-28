import logo from "../../img/logo.png";
import React from "react";

const LoginForm = ({
    handlepasswordchange,
    handleusernamechange,
    handlelogin,
    username,
    password
                   }) => {
    return (
        <>
            {
                localStorage.getItem("user") ? (<> </>) :
                    (
                        <div id="login" className="fixed top-0 left-0 bg-[#1D1D1D] bg-opacity-50 backdrop-blur-md z-[999999] w-full h-screen flex justify-center items-center ">
                            <div className="flex items-center flex-col ">
                                <img width={200} src={logo} alt="" />
                                <p className="text-white text-center text-2xl font-bold mt-2">Login</p>
                                <form
                                    onSubmit={handlelogin}
                                    className="text-center mt-5 flex flex-col">
                                    {/*username*/}
                                    <input value={username} onChange={handleusernamechange} id="username_login" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500" type="text" placeholder="Username" />
                                    <input value={password} onChange={handlepasswordchange} id="password_login" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2" type="password" placeholder="Password" />
                                    <button className="w-72 h-10 bg-blue-500 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2">Login</button>
                                </form>
                                {/*dont have accont register*/}
                                <p className="text-white text-center text-sm mt-2">Don't have an account? <span onClick={() => { document.getElementById("reg").classList.remove("hidden"); document.getElementById("login").classList.add("hidden") }} className="text-blue-500 cursor-pointer">Register</span></p>
                                <p id="error_login" className="text-red-500 text-center text-sm hidden">Error</p>
                            </div>
                        </div>
                    )
            }
            </>
    );
}

export default LoginForm;