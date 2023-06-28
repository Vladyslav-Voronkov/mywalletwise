import logo from "../../img/logo.png";
import React from "react";

const RegisterForm = ({
    username,
    email,
    password,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
                      }) => {
    return (<>
        {
            localStorage.getItem("user")
            === null ?
                (<div id="reg" className="hidden fixed top-0 left-0 bg-[#1D1D1D] bg-opacity-50 backdrop-blur-md z-[999999] w-full h-screen flex justify-center items-center ">
                    <div className="flex items-center flex-col ">
                        <img width={200} src={logo} alt="" />
                        <p className="text-white text-center text-2xl font-bold mt-2">Register</p>
                        <form
                            onSubmit={handleSubmit}
                            className="text-center mt-5 flex flex-col">
                            {/*username*/}
                            <input required={true} value={username} onChange={handleUsernameChange} id="username" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500" type="text" placeholder="Username" />
                            <input required={true} value={email} onChange={handleEmailChange} id="email" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2" type="email" placeholder="Email" />
                            <input required={true} value={password} onChange={handlePasswordChange} id="password" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2" type="password" placeholder="Password" />
                            {/*input with date hidden*/}
                            <input id="date_register" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2 hidden" type="date" placeholder="Date" />
                            {/*date last activity*/}
                            <input id="date_last_activity" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2 hidden" type="date" placeholder="Date" />
                            <button className="w-72 h-10 bg-blue-500 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2">Register</button>
                        </form>
                        {/* already has an account */}
                        <p className="text-white text-center text-sm mt-2">Already have an account? <span onClick={() => {
                            document.getElementById("reg").classList.add("hidden");
                            document.getElementById("login").classList.remove("hidden");
                        }} className="text-blue-500 cursor-pointer">Login</span></p>
                        <p id="error_register" className="text-white text-center text-sm text-gray-400 hidden">Error</p>
                    </div>
                </div>) : (<> </>)
        }

    </>);
}

export default RegisterForm;