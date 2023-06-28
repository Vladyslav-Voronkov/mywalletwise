import avatar_1_preview from "../../img/avatar-1-preview.webp"
import avatar_2_preview from "../../img/avatar-2-preview.webp"
import avatar_3_preview from "../../img/avatar-3-preview.webp"
import avatar_4_preview from "../../img/avatar-4-preview.webp"
import avatar_5_preview from "../../img/avatar-5-preview.webp"
import x from "../../img/icons/x.svg"
import users from "../../img/icons/users.svg"
import sparkles from "../../img/icons/sparkles.svg"

const ModalAccountSettings = ({
    state,
}) => {

    return (
        <>

            <div
                id="modal_ACCOUNT_SETTINGS"
                className="duration-500 -translate-y-[96rem] z-50 fixed top-0 left-0 w-full h-full md:w-1/3 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-[#000] bg-opacity-50 rounded-2xl backdrop-blur-md mx-2 w-full h-2/2">
                    <div className="flex justify-between items-center px-5 py-3">
                        <h1 className="text-2xl text-white mt-5">Account Settings</h1>
                        <button className="text-2xl text-white" onClick={() => {
                            document.getElementById("account_settings").style.display = "flex";
                            document.getElementById("avatar_selector").style.display = "none";
                            document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-96rem)";
                            document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "0";
                            document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.9s ease";
                            // document.getElementById("modal_ACCOUNT_SETTINGS").style.display = "none";
                            // translate x
                        }}>
                            <img src={x} alt="x_icon" className="w-5 h-5 hover:scale-110 duration-300 hover:rotate-180" />
                        </button>

                    </div>

                    <div id="account_settings" className="px-5 py-3 flex justify-between items-center w-full">
                        <div className="
                         flex flex-col justify-center items-center
                       ">

                            {/* <img width={100} src={avatar_1_preview}  alt="Avatar" /> */}
                            {
                                // load avatar from local storage
                                state.avatar_name === "avatar_1" ? <img width={120} src={avatar_1_preview} alt="Avatar" /> : null

                            }
                            {state.avatar_name === "avatar_2" ? <img width={120} src={avatar_2_preview} alt="Avatar" /> : null}
                            {state.avatar_name === "avatar_3" ? <img width={120} src={avatar_3_preview} alt="Avatar" /> : null}
                            {state.avatar_name === "avatar_4" ? <img width={120} src={avatar_4_preview} alt="Avatar" /> : null}
                            {state.avatar_name === "avatar_5" ? <img width={120} src={avatar_5_preview} alt="Avatar" /> : null}
                        </div>
                        {/* change circle buttons */}
                        <div className="flex justify-center items-center mt-5 ml-2">
                            <div className="text-white flex flex-col items-center">
                                <button
                                    onClick={
                                        () => {
                                            document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-14rem)";
                                            document.getElementById("avatar_selector").style.display = "flex";

                                            document.getElementById("account_settings").style.display = "none";
                                        }
                                    }
                                    className="bg-gradient-to-t from-red-500 to-yellow-900 w-14 h-14 rounded-full flex justify-center items-center text-white text-4xl active:bg-white">
                                   <img src={users} alt="users_icon" className="w-5 h-5" />
                                    ️</button>
                                Avatar
                            </div>
                            <div className="text-white flex flex-col items-center ml-5">
                                <button onClick={
                                    () => {
                                        if (document.getElementById("bg_particles").style.display === "none") {
                                            document.getElementById("bg_particles").style.display = "flex";
                                        } else {
                                            document.getElementById("bg_particles").style.display = "none";
                                        }
                                    }
                                } className="bg-gradient-to-t from-green-500 to-blue-900 w-14 h-14 rounded-full flex justify-center items-center text-white text-4xl">
                                    <img src={sparkles} alt="sparkles_icon" className="w-5 h-5" />
                                </button>
                                Particles
                            </div>
                        </div>

                    </div>
                    <div id="avatar_selector" className="hidden flex justify-between items-center mt-2  shrink  md:overflow-x-hidden overflow-y-hidden w-2/2 overflow-x-scroll md:m-auto">
                        <img
                            className="cursor-pointer hover:scale-110 transform transition duration-500 ease-in-out overflow-x-hidden"
                            onClick={
                                () => {
                                    document.getElementById("avatar_selector").style.display = "none";
                                    document.getElementById("account_settings").style.display = "flex";
                                    localStorage.setItem("avatar_name", "avatar_1");
                                    window.location.reload();
                                }
                            } src={avatar_1_preview} width={100} alt="" />
                        <img
                            className="cursor-pointer hover:scale-110 transform transition duration-500 ease-in-out overflow-x-hidden"
                            onClick={
                                () => {
                                    document.getElementById("avatar_selector").style.display = "none";
                                    document.getElementById("account_settings").style.display = "flex";
                                    localStorage.setItem("avatar_name", "avatar_2");
                                    window.location.reload();
                                }
                            }
                            src={avatar_2_preview} width={100} alt="" />
                        <img
                            className="cursor-pointer hover:scale-110 transform transition duration-500 ease-in-out overflow-x-hidden"
                            onClick={
                                () => {
                                    document.getElementById("avatar_selector").style.display = "none";
                                    document.getElementById("account_settings").style.display = "flex";
                                    localStorage.setItem("avatar_name", "avatar_3");
                                    window.location.reload();
                                }
                            }
                            src={avatar_3_preview} width={100} alt="" />

                        <img
                            className="cursor-pointer hover:scale-110 transform transition duration-500 ease-in-out overflow-x-hidden"
                            onClick={
                                () => {
                                    document.getElementById("avatar_selector").style.display = "none";
                                    document.getElementById("account_settings").style.display = "flex";
                                    localStorage.setItem("avatar_name", "avatar_4");
                                    window.location.reload();
                                }
                            }
                            src={avatar_4_preview} width={100} alt="" />
                        <img
                            className="cursor-pointer hover:scale-110 transform transition duration-500 ease-in-out overflow-x-hidden"
                            onClick={
                                () => {
                                    document.getElementById("avatar_selector").style.display = "none";
                                    document.getElementById("account_settings").style.display = "flex";
                                    localStorage.setItem("avatar_name", "avatar_5");
                                    window.location.reload();
                                }
                            }
                            src={avatar_5_preview} width={100} alt="" />


                    </div>
                </div>


            </div></>
    );
}

export default ModalAccountSettings;