import React from "react";

import avatar_default from "../../img/avatar-default-icon.png";
import avatar_1 from "../../img/avatar-1.webp";
import avatar_2 from "../../img/avatar-2.webp";
import avatar_3 from "../../img/avatar-3.webp";
import avatar_4 from "../../img/avatar-4.webp";
import avatar_5 from "../../img/avatar-5.webp";


const Header = () => {
    const state = {
        user: {
            name: "",
        },
        screenTitle: "expenses",
        avatar_name: "avatar_1",
    };

    // load avatar from local storage
    const loadAvatar = () => {
        const avatar = localStorage.getItem("avatar_name");
        if (avatar) {
            state.avatar_name = avatar;
        }
    };

    loadAvatar();

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            state.user = user;
        }
    }, state.user = {
        name: "Vladyslav Voronkov",
    }
    );




    return (
        <header className="bg-transparent flex justify-between items-center px-2 py-5 fixed w-full ">
            {/* User */}
            <div className="flex items-center">
                {
                    state.avatar_name === "avatar_1" ? (
                        <img onClick={
                            // open modal settings
                            () => {
                                // display flex
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "1";
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.5s ease";
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-18rem)";
                                // document.getElementById("modal_ACCOUNT_SETTINGS").style.visibility = "visible";

                            }

                        } width={60} src={avatar_1} className="
                        bg-gradient-to-tr from-[#ff8a00] to-[#e52e71]
                        p-1 rounded-full" alt="Default Avatar" />
                    ) : (<div></div>)
                }
                {
                    state.avatar_name === "avatar_2" ? (
                        <img onClick={
                            // open modal settings
                            () => {
                                // display flex
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "1";
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.5s ease";
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-18rem)";
                                // document.getElementById("modal_ACCOUNT_SETTINGS").style.visibility = "visible";

                            }

                        } width={60} src={avatar_2} className="
                        bg-gradient-to-tr from-[#ff8a00] to-[#e52e71]
                        p-1 rounded-full" alt="Default Avatar" />
                    ) : (<div></div>)
                }
                {
                    state.avatar_name === "avatar_3" ? (
                        <img onClick={
                            // open modal settings
                            () => {
                                // display flex
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "1";
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.5s ease";
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-18rem)";
                                // document.getElementById("modal_ACCOUNT_SETTINGS").style.visibility = "visible";

                            }

                        } width={60} src={avatar_3} className="
                        bg-gradient-to-tr from-[#ff8a00] to-[#e52e71]
                        p-1 rounded-full" alt="Default Avatar" />
                    ) : (<div></div>)

                }
                {
                    state.avatar_name === "avatar_4" ? (
                        <img onClick={
                            // open modal settings
                            () => {
                                // display flex
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "1";
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.5s ease";
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-18rem)";
                                // document.getElementById("modal_ACCOUNT_SETTINGS").style.visibility = "visible";

                            }

                        } width={60} src={avatar_4} className="
                        bg-gradient-to-tr from-[#ff8a00] to-[#e52e71]
                        p-1 rounded-full" alt="Default Avatar" />
                    ) : (<div></div>)

                }
                 {
                    state.avatar_name === "avatar_5" ? (
                        <img onClick={
                            // open modal settings
                            () => {
                                // display flex
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "1";
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.5s ease";
                                document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-18rem)";
                                // document.getElementById("modal_ACCOUNT_SETTINGS").style.visibility = "visible";

                            }

                        } width={60} src={avatar_5} className="
                        bg-gradient-to-tr from-[#ff8a00] to-[#e52e71]
                        p-1 rounded-full" alt="Default Avatar" />
                    ) : (<div></div>)

                }
                {/* UserName and Mountly Budget */}
                <div className="text-white ml-2">
                    <h2 className="text-xs text-gray-400">Hi, {state.user.name}!</h2>
                    <p><span className="text-gray-400">Wallet</span> Wise</p>
                </div>
            </div>

            {/* My Balance */}
            <div className="" onClick={
                () => {
                    // clear local storage
                    localStorage.clear();
                    window.location.reload();
                }
            }>
                <div className="flex justify-between items-center  text-white border border-gray-500 bg-[#222] p-2 rounded-full">
                    <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
                    <span>My Balance</span>
                </div>
            </div>
        </header>
    );
}

export default Header;