import x_icon from "../img/icons/x.svg"
import pencil_alt from "../img/icons/pencil-alt.svg"
import check from "../img/icons/check.svg"

// Modal window to add/edit a target

const ModalAddTarget = ({
    state,
    addtarget
}) => {
    return (
        <>
            <div
                id="modal_ADD_TARGET"
                className="z-50 -translate-x-96 fixed top-0 left-0 w-3/3  h-full justify-center items-center">
                <div className="bg-[#000] bg-opacity-50 backdrop-blur-md translate-y-52 rounded-2xl w-full mx-2 h-2/2">
                    {/* Header */}
                    <div className="flex justify-between items-center px-5 py-3">
                        {/* Window name */}
                        <h1 className="text-2xl text-white flex items-center">
                            <img src={pencil_alt} alt="pencil_alt" className="w-5 h-5 mr-2" />
                            Edit Target</h1>
                        {/* Close button */}
                        <button className="text-2xl text-white" onClick={() => {
                            document.getElementById("modal_ADD_TARGET").style.transform = "translateX(-96rem)";
                        }}>
                            <img
                                src={x_icon}
                                alt="x_icon"
                                className="w-5 h-5 hover:scale-110 duration-300 hover:rotate-180"
                            />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-5 py-3">
                        {/* Input name*/}
                        <div className="flex justify-between items-center">
                            <input
                                placeholder={
                                    state.targetName === "" ? "Name" : state.targetName
                                }
                                id="name_target"
                                name="name_target"
                                className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent
                                focus:border-green-500 focus:scale-105 duration-300
                                invalid:border-red-500 invalid:scale-105 
                                "
                                type="text"
                            />
                        </div>

                        {/* Input amount */}
                        <div className="flex justify-between items-center mt-5">
                            <input
                                placeholder={
                                    state.targetAmount === "" ? "Amount" : state.targetAmount
                                }
                                id="amount_target"
                                name="amount_target"
                                pattern="[0-9]*"
                                className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent
                                focus:border-green-500 focus:scale-105 duration-300
                                invalid:border-red-500 invalid:scale-95
                                "
                                type="text"
                            />
                        </div>

                        {/* Button add/edit */}
                        <div className="flex justify-center items-center mt-5">
                            <button onClick={
                                () => {
                                    // if amount_target is not a number
                                    if (isNaN(document.getElementById("amount_target").value)) {
                                        return null;
                                    } else {
                                        addtarget()
                                    }
                                }
                            } className="
                            bg-gray-500 w-full rounded-md px-5 py-2 text-white
                            hover:bg-green-500 hover:scale-105 duration-300
                            ">
                                <img src={check} alt="plus" className="w-5 h-5 m-auto" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAddTarget;