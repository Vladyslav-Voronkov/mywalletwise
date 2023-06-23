import target from "../img/icons/target.svg";
import calendar from "../img/icons/calendar.svg";

const Target = ({
    state,
}) => {
    return (
        <div className="shrink-0 md:w-1/6 mt-5 w-3/5 flex flex-col items-center justify-center text-white 
                    
                    ">
                        <div
                            onClick={
                                () => {
                                    document.getElementById("modal_ADD_TARGET").style.transform = "translateX(0rem)";
                                    // duration
                                    document.getElementById("modal_ADD_TARGET").style.transition = "all 0.5s ease";
                                }

                            }
                            className=" bg-black bg-opacity-30
                      backdrop-blur-md drop-shadow-xl p-7 text-white rounded-3xl ml-5 hover:bg-opacity-50 duration-300 cursor-pointer">

                            {/* Target name */}
                            <h1 className="mt-2 text-2xl">{
                                state.targetName === "" ? "No target" : state.targetName
                            }</h1>
                            <h1 className="mt-2 text-xl text-green-300 font-bold">{
                                state.targetName === "" ? "No target" : state.targetAmount + " PLN"
                            }</h1>
                            {/* When i can buy it date*/}
                            <div className="mt-2 w-max bg-[#ffffff55] rounded-full px-3 py-1 flex items-center">
                                <img src={calendar} className="w-6 inline-block mr-1" />
                                {
                                state.targetName === "" ? "No target" : "04.08.2023"
                            }</div>


                        </div>
                        <h1 className="text-lg font-bold mt-1 flex items-center">
                            <img src={target} className="w-6 inline-block mr-2" />
                            Target</h1>
                    </div>
    )
}

export default Target;