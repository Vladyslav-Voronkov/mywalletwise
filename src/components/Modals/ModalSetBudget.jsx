import x from "../../img/icons/x.svg";
import beaker from "../../img/icons/beaker.svg";
import starsai from "../../img/icons/starsai.svg";
import check from "../../img/icons/check.svg";
const ModalSetBudget = ({
    state,

}) => {
    return (
        <>
            <div
                id="modal_SET_BUDGET" 
                className="z-50 hidden fixed top-0 left-0 w-full h-full justify-center items-center">
                <div className="bg-[#000] bg-opacity-50 rounded-2xl w-2/2  mx-5 h-2/2 backdrop-blur-md">
                    <div className="flex justify-between items-center px-5 py-3">
                        <h1 className="text-2xl text-white flex items-center">
                            <img src = {beaker} alt = "beaker" className = "w-5 h-5 mr-2"/>
                            Set Budget</h1>
                        <button className="text-2xl text-white" onClick={() => {
                            document.getElementById("modal_SET_BUDGET").style.display = "none";
                        }}>
                            <img src={x} alt="x" className="
                            w-5 h-5 hover:rotate-90 transition duration-500 ease-in-out hover:scale-110"/>
                        </button>
                    </div>
                    <div className="px-5 py-3">
                        <div className="flex flex-col ">
                            <h1 className="text-xl text-white">Budget</h1>
                            <input
                                value={localStorage.getItem("dynamic_budget") === "true" ? state.budget : null}
                                placeholder={state.budget}
                                id="budget" name="budget" className="border border-gray-400 w-1/2 mt-2 text-white rounded-md px-3 py-1  text-2xl outline-none bg-transparent" type="text" />
                            {/* checkbox "Dynamic budget" */}
                            <br />
                            <div className="flex flex-col  items-start">
                                <div className="flex items-center justify-between">
                                    <input
                                        disabled={true}
                                        checked={localStorage.getItem("dynamic_budget") === "true" ? true : false}
                                        onChange={() => {
                                            if (localStorage.getItem("dynamic_budget") === "true") {
                                                localStorage.setItem("dynamic_budget", false);
                                                window.location.reload();
                                            } else {
                                                localStorage.setItem("dynamic_budget", true);
                                                window.location.reload();
                                            }
                                        }

                                        }
                                        className="w-5 h-5 border border-gray-400 rounded-full"
                                        type="checkbox" id="dynamic_budget" name="dynamic_budget" value="dynamic_budget" />
                                    <label className="ml-2 text-white flex items-center" htmlFor="dynamic_budget">
                                        {/*<img src = {beaker} alt = "beaker" className = "w-5 h-5"/>*/}
                                        Dynamic budget AI</label>
                                        <img src = {starsai} alt = "starsai" className = "w-5 h-5"/>
                                </div>
                                <div className="text-gray-400 text-sm mt-2">*Dynamic budget AI isn't available for now.
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-5">
                            <button onClick={() => {
                                state.budget = document.getElementById("budget").value;
                                localStorage.setItem("budget", state.budget);
                                document.getElementById("modal_SET_BUDGET").style.display = "none";
                                window.location.reload();
                            }} className="bg-gray-500 w-1/2 rounded-md px-5 py-2 text-white
                            hover:bg-green-500
                             transition duration-500 ease-in-out hover:scale-105 flex items-center text-center justify-center
                            ">
                                <img src = {check} alt = "check" className = "w-5 h-5 mr-2"/>
                                Set</button>
                        </div>
                    </div>
                </div>
            </div></>
    );
}

export default ModalSetBudget;