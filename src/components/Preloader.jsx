import logo from "../img/logo.png";
import React from "react";

const Preloader = () => {
    return (
    <div id="preloader" className="fixed  top-0 left-0 bg-[#1D1D1D] bg-opacity-50 backdrop-blur-md z-[1000] w-full h-screen flex justify-center items-center">
        <div className="flex items-center flex-col ">
            <img width={200} src={logo} alt="" />
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p id="longLoad" className="text-white text-center text-sm text-gray-400 hidden ">Loading is too long? Check your internet connection</p>

        </div>
        {
            setTimeout(() => {
                    document.getElementById("longLoad").classList.remove("hidden");
                }
                , 5000)
        }
    </div>
    );
}

export default Preloader;