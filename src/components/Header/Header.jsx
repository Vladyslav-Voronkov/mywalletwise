import React from "react";

import avatar_default from "../../img/avatar-default-icon.png";

const Header = () => {
    const state = {
        user: {
            name: "",
        },
        screenTitle: "expenses",
    };

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            state.user = user;
        }
    }, state.user = {
        name: "Vladyslav Voronkov",
    });


    return (
        <header className="bg-[#1a1a1a] flex justify-between items-center px-2 py-5 fixed w-full ">
            {/* User */}
            <div className="flex items-center">
                <img width={60} src={avatar_default} alt="Default Avatar" />
                {/* UserName and Mountly Budget */}
                <div className="text-white ml-2">
                    <h2 className="text-xs text-gray-400">Hi, {state.user.name}!</h2>
                    <p><span className="text-gray-400">Wallet</span> Wise</p>
                </div>
            </div>

            {/* My Balance */}
            <div className="">
                {window.location.pathname === "/" ? (
                    <div onClick={() => {
                        // load /target page
                        window.location.href = "/target";
                    }} className="flex justify-between items-center  text-white border border-gray-500 bg-[#222] p-2 rounded-full">
                        <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
                        <span>My Balance</span>
                    </div>
                ) : ""}

                {window.location.pathname === "/expenses" ? (
                    <div onClick={() => {
                        // load /target page
                        window.location.href = "/target";
                    }} className="flex justify-between items-center  text-white border border-gray-500 bg-[#222] p-2 rounded-full">
                        <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
                        <span>My Balance</span>
                    </div>
                ) : ""}

                {window.location.pathname === "/target" ? (
                    <div onClick={() => {
                        // load /target page
                        window.location.href = "/";
                    }} className="flex justify-between items-center  text-white border border-gray-500 bg-[#222] p-2 rounded-full">
                        <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
                        <span>Target</span>
                    </div>
                ) : ""}
            </div>
        </header>
    );
}

export default Header;