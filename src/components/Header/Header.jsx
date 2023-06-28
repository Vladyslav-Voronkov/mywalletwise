import React from "react";

import avatar_default from "../../img/avatar-default-icon.png";
import avatar_1 from "../../img/avatar-1.webp";
import avatar_2 from "../../img/avatar-2.webp";
import avatar_3 from "../../img/avatar-3.webp";
import avatar_4 from "../../img/avatar-4.webp";
import avatar_5 from "../../img/avatar-5.webp";

import verified from "../../img/icons/verified.svg";
import bell from "../../img/icons/bell.svg";


const Header = ({
    notificationsOPCL,
    notifications
                }) => {
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

    // update time every second
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());
    setInterval(() => {
        setTime(new Date().toLocaleTimeString());
    } , 1000);


    loadAvatar();

    // get time to say good day, good morning e.t.c
    const getTime = () => {
        const date = new Date();
        const hours = date.getHours();
        if (hours < 12) {
            return "Good Morning";
        } else if (hours < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    }

    if(JSON.parse(localStorage.getItem("user"))){
        state.user = JSON.parse(localStorage.getItem("user")).username;
    } else {
        state.user = "User";
    }
        // alert(state.user);
    return (
        <header className="bg-transparent flex justify-between items-center px-2 py-2 fixed w-full backdrop-blur-md z-30 ">
            {/* User */}

            <div className="flex items-center">
                {
                    state.avatar_name === "avatar_1" ? (
                        <>
                            <img onClick={
                                // open modal settings
                                () => {
                                    // display flex
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "1";
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.5s ease";
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-13rem)";
                                    // document.getElementById("modal_ACCOUNT_SETTINGS").style.visibility = "visible";

                                }

                            } width={60} src={avatar_1} className="
                        bg-gradient-to-tr from-[#4d5fae] to-[#4c3067] drop-shadow-xl
                        p-1 rounded-full cursor-pointer hover:scale-105 duration-300 relative" alt="Default Avatar" />
                            {
                            //     if user register date is less than 19 june 2023 then display verified icon
                            //     else display nothing
                                localStorage.getItem("user") ? (
                                    JSON.parse(localStorage.getItem("user")).registerDate >= Date.parse("19 June 2023") ? (
                                        <div></div>) : (
                                        <img
                                            title="Verified Account"
                                            src={verified} className="cursor-pointer
                                hover:scale-105 duration-300
                                w-6 h-6 ml-10 mb-10 absolute bg-black bg-opacity-30 backdrop-blur-md rounded-full "
                                            alt="verified"/>
                                    )
                                ) : (<div></div>)

                            }
                        </>
                    ) : (<div></div>)
                }
                {
                    state.avatar_name === "avatar_2" ? (
                       <>
                           <img onClick={
                               // open modal settings
                               () => {
                                   // display flex
                                   document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "1";
                                   document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.5s ease";
                                   document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-13rem)";
                                   // document.getElementById("modal_ACCOUNT_SETTINGS").style.visibility = "visible";

                               }

                           } width={60} src={avatar_2} className="
                        bg-gradient-to-tr from-[#4d5fae] to-[#4c3067] drop-shadow-xl
                        p-1 rounded-full cursor-pointer hover:scale-105 duration-300" alt="Default Avatar" />
                           {
                               //     if user register date is less than 19 june 2023 then display verified icon
                               //     else display nothing
                               localStorage.getItem("user") ? (
                                   JSON.parse(localStorage.getItem("user")).registerDate >= Date.parse("19 June 2023") ? (
                                       <div></div>) : (
                                       <img
                                           title="Verified Account"
                                           src={verified} className="cursor-pointer
                                hover:scale-105 duration-300
                                w-6 h-6 ml-10 mb-10 absolute bg-black bg-opacity-30 backdrop-blur-md rounded-full "
                                           alt="verified"/>
                                   )
                               ) : (<div></div>)

                           }
                       </>
                    ) : (<div></div>)
                }
                {
                    state.avatar_name === "avatar_3" ? (
                        <>
                            <img onClick={
                                // open modal settings
                                () => {
                                    // display flex
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "1";
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.5s ease";
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-13rem)";
                                    // document.getElementById("modal_ACCOUNT_SETTINGS").style.visibility = "visible";

                                }

                            } width={60} src={avatar_3} className="
                        bg-gradient-to-tr from-[#4d5fae] to-[#4c3067] drop-shadow-xl
                        p-1 rounded-full cursor-pointer hover:scale-105 duration-300" alt="Default Avatar" />
                            {
                                //     if user register date is less than 19 june 2023 then display verified icon
                                //     else display nothing
                                localStorage.getItem("user") ? (
                                    JSON.parse(localStorage.getItem("user")).registerDate >= Date.parse("19 June 2023") ? (
                                        <div></div>) : (
                                        <img
                                            title="Verified Account"
                                            src={verified} className="cursor-pointer
                                hover:scale-105 duration-300
                                w-6 h-6 ml-10 mb-10 absolute bg-black bg-opacity-30 backdrop-blur-md rounded-full "
                                            alt="verified"/>
                                    )
                                ) : (<div></div>)

                            }
                            </>
                    ) : (<div></div>)

                }
                {
                    state.avatar_name === "avatar_4" ? (
                        <>
                            <img onClick={
                                // open modal settings
                                () => {
                                    // display flex
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "1";
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.5s ease";
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-13rem)";
                                    // document.getElementById("modal_ACCOUNT_SETTINGS").style.visibility = "visible";

                                }

                            } width={60} src={avatar_4} className="
                        bg-gradient-to-tr from-[#4d5fae] to-[#4c3067] drop-shadow-xl
                        p-1 rounded-full cursor-pointer hover:scale-105 duration-300" alt="Default Avatar" />
                            {
                                //     if user register date is less than 19 june 2023 then display verified icon
                                //     else display nothing
                                localStorage.getItem("user") ? (
                                    JSON.parse(localStorage.getItem("user")).registerDate >= Date.parse("19 June 2023") ? (
                                        <div></div>) : (
                                        <img
                                            title="Verified Account"
                                            src={verified} className="cursor-pointer
                                hover:scale-105 duration-300
                                w-6 h-6 ml-10 mb-10 absolute bg-black bg-opacity-30 backdrop-blur-md rounded-full "
                                            alt="verified"/>
                                    )
                                ) : (<div></div>)

                            }</>
                    ) : (<div></div>)

                }
                {
                    state.avatar_name === "avatar_5" ? (
                        <>
                            <img onClick={
                                // open modal settings
                                () => {
                                    // display flex
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "1";
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.5s ease";
                                    document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-13rem)";
                                    // document.getElementById("modal_ACCOUNT_SETTINGS").style.visibility = "visible";

                                }

                            } width={60} src={avatar_5} className="
                        bg-gradient-to-tr from-[#4d5fae] to-[#4c3067] drop-shadow-xl
                        p-1 rounded-full cursor-pointer hover:scale-105 duration-300" alt="Default Avatar" />
                            {
                                //     if user register date is less than 19 june 2023 then display verified icon
                                //     else display nothing
                                localStorage.getItem("user") ? (
                                    JSON.parse(localStorage.getItem("user")).registerDate >= Date.parse("19 June 2023") ? (
                                        <div></div>) : (
                                        <img
                                            title="Verified Account"
                                            src={verified} className="cursor-pointer
                                hover:scale-105 duration-300
                                w-6 h-6 ml-10 mb-10 absolute bg-black bg-opacity-30 backdrop-blur-md rounded-full "
                                            alt="verified"/>
                                    )
                                ) : (<div></div>)

                            }</>
                    ) : (<div></div>)

                }
                {/* UserName and Mountly Budget */}
                <div className="text-white ml-2">
                    <h2 className="text-xs text-gray-400">{
                        getTime()
                    } {state.user}!</h2>
                    <h1 className={"text-xs text-gray-400"}>Wallet Wise | beta2.0.1</h1>
                    {/*<p className="text-sm flex items-center">*/}
                    {/*    {*/}
                    {/*    //     month*/}

                    {/*        new Date().toLocaleString('eng', { month: 'long' })*/}
                    {/*    } {new Date().getDate()*/}
                    {/*    } {new Date().getFullYear()*/}
                    {/*    }*/}
                    {/*    <p className={"ml-1"}>*/}
                    {/*    {*/}
                    {/*        time*/}
                    {/*    }*/}
                    {/*    </p>*/}
                    {/*</p>*/}
                </div>
    {/*            <div onClick={*/}
    {/*                () => {*/}
    {/*                //    close or open notification smooth animated*/}
    {/*                    if (notifications.style.transform === "translateY(0rem)") {*/}
    {/*                        notifications.style.transform = "translateY(-96rem)";*/}
    {/*                        notifications.style.transition = "all 0.5s ease";*/}
    {/*                    }*/}
    {/*                    else {*/}
    {/*                        notifications.style.transform = "translateY(0rem)";*/}
    {/*                        notifications.style.transition = "all 0.5s ease";*/}
    {/*                    }*/}
    {/*                } }*/}
    {/*                className="ml-5 relative cursor-pointer">*/}
    {/*                <img*/}
    {/*src={bell}  className="w-6 h-6 cursor-pointer hover:scale-105 duration-300 relative" alt="bell" />*/}
    {/*                <div className="*/}
    {/*                w-3 h-3 bg-red-500 rounded-full absolute top-0 right-0 text-white flex justify-center items-center text-xs*/}
    {/*                ">*/}
    {/*                    <h1>1 </h1>*/}
    {/*                </div>*/}
    {/*            </div>*/}

            </div>

            {/* My Balance */}
            <div>
                <div className="flex items-center text-white border-b py-2
                ">
                    <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
                    <span
                    onClick={
                    () => {
                        localStorage.clear();
                        window.location.reload();
                    }
                    }
                    >Log Out</span>
                </div>
            </div>
        </header>
    );
}

export default Header;