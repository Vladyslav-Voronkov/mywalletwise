// import icons
import home from "../img/icons/home.svg";
import food from "../img/icons/food.svg";
import saving from "../img/icons/saving.svg";
import transport from "../img/icons/transport.svg";
import clothing from "../img/icons/clothing.svg";
import health from "../img/icons/health.svg";
import entertainment from "../img/icons/entertainment.svg";
import other from "../img/icons/other.svg";

const Icons = (
    { expense }
) => {
    return (
        <div className="flex justify-between items-center">
            {expense.category === "Housing" ? <div className="
            bg-gradient-to-r from-red-500 to-yellow-500
            rounded-full p-5
            ">
                <img src={home} alt="home" />
            </div> : null}
            {expense.category === "Food" ? <div className="
            bg-gradient-to-r from-yellow-500 to-green-500
            rounded-full p-5">
                <img src={food} alt="food" />
            </div> : null}
            {expense.category === "Saving" ? <div className="
            bg-gradient-to-r from-green-500 to-blue-500
        rounded-full p-5">
                <img src={saving} alt="saving" />
            </div> : null}
            {expense.category === "Transport" ? <div className="
            bg-gradient-to-r from-blue-500 to-purple-500
            rounded-full p-5">
                <img src={transport} alt="transport" />
            </div> : null}
            {expense.category === "Clothing" ? <div className="
            bg-gradient-to-r from-purple-500 to-pink-500
            rounded-full p-5">
                <img src={clothing} alt="clothing" />
            </div> : null}
            {expense.category === "Health" ? <div className="
            bg-gradient-to-r from-pink-500 to-indigo-500
            rounded-full p-5">
                <img src={health} alt="health" />
            </div> : null}
            {expense.category === "Entertainment" ? <div className="
            bg-gradient-to-r from-indigo-500 to-red-500
            rounded-full p-5">
                <img src={entertainment} alt="entertainment" />
            </div> : null}
            {expense.category === "Other" ? <div className="
            bg-gradient-to-r from-red-500 to-yellow-500
            rounded-full p-5">
                <img src={other} alt="other" />
            </div> : null}
            <div className="ml-3">
                <h1 className="text-white text-lg">{expense.name}</h1>
                <h1 className="text-gray-400 text-sm">{expense.category}</h1>
            </div>
        </div>
    );
}

const Spendings = ({
    state, expenses
}) => {
    return (
        <>
            <div className="my-10 pb-20 md:mt-5 mt-[450px] pt-5 backdrop-blur-sm  w-full px-5 overflow-x-hidden bg-black bg-opacity-80 z-40 absolute
             ">
                <a href="#top"><div className="w-32 h-1 rounded-full mt-2 bg-white m-auto absolute left-0 top-0 ml-32 md:hidden"></div></a>
                <div className="overflow-y-scroll md:overflow-y-hidden  overflow-x-hidden md:w-2/3 md:m-auto">
                    {/* Today expenses */}
                    <h1 className="text-white text-xl">Today</h1>
                    {/* sort by date "TODAY" */}
                    {
                        //    get today expenses
                        expenses.filter((expense) => {
                            const today = new Date();
                            const date = new Date(expense.date);
                            return date.getDate() === today.getDate();
                        }
                        ).reverse().map((expense) => (
                            <div
                                id={expense.id}
                                className="flex justify-between items-center mt-4">
                                <div
                                    onClick={() => {
                                        // delete expense
                                        const expenses = JSON.parse(localStorage.getItem("expenses"));
                                        // find this expense in expenses
                                        expenses.map((expense) => {
                                            if (expense.id === expense.id) {
                                                // delete this expense
                                                expenses.splice(expense.id, 1);
                                                // save to local storage
                                                localStorage.setItem("expenses", JSON.stringify(expenses));
                                                window.location.reload();
                                            }
                                        })
                                    }}

                                    id={
                                        "delete_" + expense.id
                                    }
                                    className="absolute hidden bg-red-500 rounded-full p-2 ml-10 mb-10 justify-center items-center text-white text-sm active:bg-white">🗑️</div>
                                <Icons expense={expense} />
                                <div>
                                    <h1 className="text-white text-xl text-right">- {expense.amount}</h1>
                                </div>
                            </div>
                        ))
                    }
                    {/* yesterday expenses */}
                    <h1 className="text-white text-xl mt-10">Yesterday</h1>
                    {/* sort by date "YESTERDAY" */}
                    {
                        expenses.filter((expense) => {
                            const today = new Date();
                            const date = new Date(expense.date);
                            return date.getDate() === today.getDate() - 1;
                        }
                        ).map((expense) => (
                            <div className="flex justify-between items-center mt-4" >
                                <Icons expense={expense} />
                                <div>
                                    <h1 className="text-white text-xl text-right">- {expense.amount}</h1>
                                </div>
                            </div>
                        ))
                    }
                    {/* earlier */}
                    <h1 className="text-white text-xl mt-10">Earlier</h1>
                    {/* sort by date "EARLIER" */}
                    {
                        expenses.filter((expense) => {
                            const today = new Date();
                            const date = new Date(expense.date);
                            return date.getDate() < today.getDate() - 1;
                        }
                        ).map((expense) => (
                            <div className="flex justify-between items-center mt-4">
                                <Icons expense={expense} />
                                <div>
                                    <h1 className="text-white text-xl text-right">- {expense.amount}</h1>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>
        </>
    );
}

export default Spendings;