// Modal window to add an expense

// Import icons
import x from "../img/icons/x.svg";

// Categories icons
import home from "../img/icons/home.svg";
import save from "../img/icons/save.svg";
import food from "../img/icons/food.svg";
import saving from "../img/icons/saving.svg";
import tansport from "../img/icons/transport.svg";
import clothing from "../img/icons/clothing.svg";
import health from "../img/icons/health.svg";
import entertainment from "../img/icons/entertainment.svg";
import other from "../img/icons/other.svg";

// import use state
import { useState } from "react";

const ModalAddExpense = ({
    state,
    changecategory,
    addexpense
}) => {

    // state of the cat_name
    const [cat_name, setCat_name] = useState("Housing");

    // setCatName from document.getElementById("exp_cat") where innerHTML was changed
    const setCatName = () => {
        if(document.getElementById("exp_cat") !== null){
            setCat_name(document.getElementById("exp_cat").innerHTML);
        }
    }

    // setCatName();

    // if exp_cat text inside was changed
    // setCatName();
    if(document.getElementById("exp_cat") !== null){
        document.getElementById("exp_cat").addEventListener("DOMSubtreeModified", setCatName);

    }

    return (
        <>
            <div
                id="modal_ADD_EXPENSE"
                className="z-50 -translate-x-[96rem] fixed top-0 left-0 w-full h-screen bg-black bg-opacity-0 justify-center items-center">
                <div className="bg-[#111] bg-opacity-50 translate-y-10 backdrop-blur-md rounded-2xl w-3/3 mx-2 h-2/2 sm:w-1/2 ">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center px-3 py-3">
                        {/* Window name */}
                        <h1 id="exp_cat" className="hidden text-2xl text-white flex items-center">
                            Housing</h1>
                        <div className="
                        bg-[#111] bg-opacity-50 rounded-full p-2 flex justify-center items-center
                        text-white w-full mr-2
                        ">

                            {cat_name === "Housing" ? <img src={home} alt="home" className="w-10 h-10" /> : null}
                            {cat_name === "Food" ? <img src={food} alt="food" className="w-10 h-10" /> : null}
                            {cat_name === "Saving" ? <img src={save} alt="save" className="w-7 h-7 mr-2" /> : null}
                            {cat_name === "Transport" ? <img src={tansport} alt="tansport" className="w-10 h-10" /> : null}
                            {cat_name === "Clothing" ? <img src={clothing} alt="clothing" className="w-10 h-10" /> : null}
                            {cat_name === "Health" ? <img src={health} alt="health" className="w-10 h-10" /> : null}
                            {cat_name === "Entertainment" ? <img src={entertainment} alt="entertainment" className="w-10 h-10" /> : null}
                            {cat_name === "Other" ? <img src={other} alt="other" className="w-10 h-10" /> : null}
                            {cat_name} / Add Expense
                        </div>
                        {/* Close window */}
                        <button className="text-2xl text-white" onClick={() => {
                            // document.getElementById("modal_ADD_EXPENSE").style.display = "none";
                            document.getElementById("modal_ADD_EXPENSE").style.transform = "translateX(-96rem)";
                            document.getElementById("modal_ADD_EXPENSE").style.opacity = "0";
                            document.getElementById("modal_ADD_EXPENSE").style.transition = "all 0.9s ease";
                        }}>
                            <img src={x} alt="x_icon" className="w-5 h-5 hover:scale-110 duration-300 hover:rotate-180" />
                        </button>
                    </div>



                    <div className="px-5 py-3">
                        <div className="flex justify-between items-center">
                            <label
                                className="text-white text-2xl
                                mr-5
                                "
                                htmlFor="name">Name:</label>
                            <input onChange={changecategory

                            } placeholder="Name" id="name" name="name" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent" type="text" />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <label htmlFor="amount" className="text-white text-2xl mr-5">Amount:</label>
                            <input placeholder="Amount" id="amount" name="amount" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent" type="number"
                            pattern={"[0-9]*"}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <label htmlFor="date" className="text-white text-2xl mr-5">Date:</label>
                            <input id="date" name="date" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 h-12 outline-none bg-transparent" type="date" />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <textarea placeholder="Notes" id="notes" name="notes" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent" type="text" />
                        </div>
                        <div className="flex justify-center items-center mt-5">
                            <button onClick={addexpense} className="bg-green-500 w-full rounded-2xl px-5 py-2 text-white">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAddExpense;