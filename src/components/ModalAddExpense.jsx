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

const ModalAddExpense = ({
    state,
    changecategory,
    addexpense
}) => {
    return (
        <>
            <div
                id="modal_ADD_EXPENSE"
                className="z-50 -translate-x-[96rem] fixed top-0 left-0 w-full h-screen bg-black bg-opacity-0 justify-center items-center">
                <div className="bg-[#111] bg-opacity-50 translate-y-10 backdrop-blur-md rounded-2xl w-3/3 mx-2 h-2/2 sm:w-1/2 ">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center px-5 py-3">
                        {/* Window name */}
                        <h1 className="text-2xl text-white flex items-center">
                            <img src={save} alt="save_icon" className="w-5 h-5 mr-2" />
                            Add Expense</h1>
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

                    {/* Preview block */}
                    <h1 className="text-white text-xl px-5 pb-2">Preview</h1>
                    <div className="flex justify-between items-center mx-5 px-2 rounded-md  border-white border py-2">
                        <div className="flex justify-between items-center">
                            <div  className="
                           bg-gradient-to-r from-purple-700 to-blue-500
                             rounded-full p-5">
                                <img id="preview_category_icon" src={home} alt="home_icon" className="w-7 h-7" />
                            </div>
                            <div className="ml-3">
                                <h1
                                    id="preview_name"
                                    className="text-white text-lg">Name</h1>
                                <h1
                                    id="preview_category"
                                    className="text-gray-400 text-sm">Housing</h1>
                            </div>
                        </div>
                        <div>
                            <h1 id="preview_amount" className="text-white text-xl text-right">- 0</h1>
                        </div>
                    </div>

                    <div className="px-5 py-3">
                        <div className="flex justify-between items-center">
                            <input onChange={changecategory

                            } placeholder="Name" id="name" name="name" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent" type="text" />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <input onChange={
                                // preview amount
                                () => {
                                    const amount = document.getElementById("amount").value;
                                    document.getElementById("preview_amount").innerHTML = `- ${amount}`;
                                }
                            } placeholder="Amount" id="amount" name="amount" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent" type="text" />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <select onChange={
                                // preview category
                                () => {
                                    const category = document.getElementById("category").value;
                                    document.getElementById("preview_category").innerHTML = category;
                                    switch (category) {
                                        case "Housing":
                                            document.getElementById("preview_category").innerHTML = "Housing";
                                            document.getElementById("preview_category_icon").src = home;
                                            break;
                                        case "Food":
                                            document.getElementById("preview_category").innerHTML = "Food";
                                            document.getElementById("preview_category_icon").src = food;
                                            break;
                                        case "Saving":
                                            document.getElementById("preview_category").innerHTML = "Saving";
                                            document.getElementById("preview_category_icon").src = saving;
                                            break;
                                        case "Transport":
                                            document.getElementById("preview_category").innerHTML = "Transport";
                                            document.getElementById("preview_category_icon").src = tansport;
                                            break;
                                        case "Clothing":
                                            document.getElementById("preview_category").innerHTML = "Clothing";
                                            document.getElementById("preview_category_icon").src = clothing;
                                            break;
                                        case "Health":
                                            document.getElementById("preview_category").innerHTML = "Health";
                                            document.getElementById("preview_category_icon").src = health;
                                            break;
                                        case "Entertainment":
                                            document.getElementById("preview_category").innerHTML = "Entertainment";
                                            document.getElementById("preview_category_icon").src = entertainment;
                                            break;
                                        case "Other":
                                            document.getElementById("preview_category").innerHTML = "Other";
                                            document.getElementById("preview_category_icon").src = other;
                                            break;
                                }}

                            } id="category" name="category" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent">
                                <option className="bg-[#111] text-white" value="Housing">🏠Housing</option>
                                <option className="bg-[#111] text-white" value="Food">🍗Food</option>
                                <option className="bg-[#111] text-white" value="Saving">💸Saving</option>
                                <option className="bg-[#111] text-white" value="Transport">🚗Transport</option>
                                <option className="bg-[#111] text-white" value="Clothing">👕Clothing</option>
                                <option className="bg-[#111] text-white" value="Health">🏥Health</option>
                                <option className="bg-[#111] text-white" value="Entertainment">🎮Entertainment</option>
                                <option className="bg-[#111] text-white" value="Other">📦Other</option>
                            </select>
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <input placeholder={
                                new Date().toISOString().slice(0, 10)
                            } id="date" name="date" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent" type="date" />
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