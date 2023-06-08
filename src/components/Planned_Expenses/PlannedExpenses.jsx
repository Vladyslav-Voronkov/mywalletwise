import React from "react";
import { ReactDOM } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const PlannedExpenses = () => {

    const state = {
        expenses: [],
        balance: 0,
        budget: 1000,
        expCategories: [],
    }

    const calculateBalance = () => {
        let total = 0;
        state.expenses.map((expense) => {
            // convert expense amount to int
            expense.amount = parseInt(expense.amount);
            total += expense.amount;
        })
        state.balance = total;
    }

    const openModal = () => {
        document.getElementById("modal_ADD_EXPENSE").style.display = "flex";
    };

    const addExpense = () => {
        const name = document.getElementById("name").value;
        const amount = document.getElementById("amount").value;
        const category = document.getElementById("category").value;
        const date = document.getElementById("date").value;
        const notes = document.getElementById("notes").value;

        const newExpense = {
            id: state.expenses.length + 1,
            name: name,
            amount: amount,
            category: category,
            date: date,
            notes: notes,
        }

        // save to local storage
        state.expenses.push(newExpense);
        localStorage.setItem("expenses", JSON.stringify(state.expenses));
        calculateBalance();
        updateExpense();
        document.getElementById("modal_ADD_EXPENSE").style.display = "none";
        window.location.reload();
    }

    const updateExpense = () => {
        if (localStorage.getItem("expenses") !== null) {
            state.expenses = JSON.parse(localStorage.getItem("expenses"));
        }
        calculateBalance();
    };

    updateExpense();

    const calculateCategoriesSum = () => {
        // calculate sum of all categories in expenses array
        state.expenses.map((expense) => {
            if (state.expCategories[expense.category] === undefined) {
                state.expCategories[expense.category] = 0;
            }
            state.expCategories[expense.category] += parseInt(expense.amount);
        }

        )
    }

    calculateCategoriesSum();

    return (
        <div className="overflow-y-hidden pt-24 bg-[#1a1a1a]"> 

            {/* modal window adding a expense */}
            <div
                id="modal_ADD_EXPENSE"
                className="z-50 hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center backdrop-blur-md">
                <div className="bg-[#1a1a1a] rounded-2xl w-2/2 h-2/2">
                    <div className="flex justify-between items-center px-5 py-3 border-b">
                        <h1 className="text-2xl text-white">Add Expense</h1>
                        <button className="text-2xl text-white" onClick={() => {
                            document.getElementById("modal_ADD_EXPENSE").style.display = "none";
                        }}>X</button>
                    </div>
                    <div className="px-5 py-3">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl text-white">Name</h1>
                            <input id="name" name="name" className="border border-gray-400 text-white rounded-md px-3 py-1 w-2/3 outline-none bg-transparent" type="text" />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <h1 className="text-xl text-white">Amount</h1>
                            <input id="amount" name="amount" className="border border-gray-400 text-white rounded-md px-3 py-1 w-2/3 outline-none bg-transparent" type="text" />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <h1 className="text-xl text-white">Category</h1>
                            <select id="category" name="category" className="border border-gray-400 text-white rounded-md px-3 py-1 w-2/3 outline-none bg-transparent">
                                <option value="Housing">Housing</option>
                                <option value="Food">Food</option>
                                <option value="Saving">Saving</option>
                            </select>
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <h1 className="text-xl text-white">Date</h1>
                            <input id="date" name="date" className="border border-gray-400 text-white rounded-md px-3 h-8 w-2/3 outline-none bg-transparent" type="date" />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <h1 className="text-xl text-white">Notes</h1>
                            <textarea id="notes" name="notes" className="border border-gray-400 text-white rounded-md px-3 py-1 w-2/3 outline-none bg-transparent" type="text" />
                        </div>
                        <div className="flex justify-center items-center mt-5">
                            <button onClick={addExpense} className="bg-green-500 w-full rounded-2xl px-5 py-2 text-white">Add</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top panel */}
            <div className="fixed w-full bg-[#1a1a1a]">
                {/* Expenses and chart */}
                <div className="mx-5 flex  justify-between items-center">
                    <div>
                        <span className="text-gray-400">Planned Expenses</span>
                        <h1 className="text-4xl mt-3 text-white">{state.balance}</h1>
                        {/* Изменить прикол с удалением инфы при нажатиия ( убрать его) */}
                        <div
                        onClick={() =>{
                            localStorage.removeItem("expenses");
                            window.location.reload();
                        }}
                        className="mt-3 rounded-full border-gray-400 border  w-max p-1 text-white px-2 ">{
                            state.budget - state.balance
                        } Left to budget</div>
                    </div>

                    {/* Pie chart */}
                    {/* <div className=" border-15 border-green-500 rounded-full w-32 h-32 flex justify-center items-center text-2xl text-white">100%</div> */}
                    <CircularProgressbar className="w-32 ml-20 text-white" value={
                        state.balance / state.budget * 100 > 100 ? 100 : state.balance / state.budget * 100
                    } text={`${state.balance / state.budget * 100 > 100 ? 100 : (state.balance / state.budget * 100).toFixed()
                        }%`}

                    />;
                </div>

                {/* Cards with expenses */}
                <div className="flex items-center px-5 mt-2 overflow-x-scroll pt-10 pb-5">
                    {/* Add Category */}
                    <div onClick={openModal} className=" shrink-0 border border-white self-stretch w-14 rounded-full flex justify-center items-center text-white text-4xl">+</div>
                    {/* Categories */}
                    {
                        Object.keys(state.expCategories).map((key) => (
                            <div className="shrink-0 bg-gradient-to-t from-pink-900 to-purple-900 w-2/5  p-5 text-white rounded-3xl ml-5">
                                <h1>{key === "Housing" ? "🏠Housing" : ""}
                                    {key === "Food" ? "🍗Food" : ""}
                                    {key === "Saving" ? "💸Saving" : ""}
                                </h1>
                                <h1 className="mt-2 text-2xl">{state.expCategories[key]}</h1>
                                <div className="mt-2 w-max bg-[#ffffff55] rounded-full px-3 py-1">{(state.expCategories[key] / state.balance * 100).toFixed()}%</div>
                            </div>
                        ))

                    }
                </div>
                <h1 className="text-white text-2xl px-5 pb-2 ">Spending this month</h1>
            </div>

            {/* Spending this month */}
            <div className="mx-5 my-10  mt-96
             ">
                <div>
                
                </div>
                <div className="overflow-y-scroll">
                    {/* Today expenses */}
                    <h1 className="text-white text-xl">Today</h1>
                    {/* sort by date "TODAY" */}
                    {   
                    //    get today expenses
                        state.expenses.filter((expense) => {
                            const today = new Date();
                            const date = new Date(expense.date);
                            return date.getDate() === today.getDate();
                        }
                        ).reverse().map((expense) => (
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex  justify-between items-center">
                                    {expense.category === "Housing" ? <div className="bg-red-800 rounded-full p-5">🏠</div> : null}
                                    {expense.category === "Food" ? <div className="bg-yellow-800 rounded-full p-5">🍗</div> : null}
                                    {expense.category === "Saving" ? <div className="bg-green-800 rounded-full p-5">💸</div> : null}
                                    <div className="ml-3">
                                        <h1 className="text-white text-lg">{expense.name}</h1>
                                        <h1 className="text-gray-400 text-sm">{expense.category}</h1>
                                    </div>
                                </div>
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
                        state.expenses.filter((expense) => {
                            const today = new Date();
                            const date = new Date(expense.date);
                            return date.getDate() === today.getDate() - 1;
                        }
                        ).map((expense) => (
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex  justify-between items-center">
                                    {expense.category === "Housing" ? <div className="bg-red-800 rounded-full p-5">🏠</div> : null}
                                    {expense.category === "Food" ? <div className="bg-yellow-800 rounded-full p-5">🍗</div> : null}
                                    {expense.category === "Saving" ? <div className="bg-green-800 rounded-full p-5">💸</div> : null}
                                    <div className="ml-3">
                                        <h1 className="text-white text-lg">{expense.name}</h1>
                                        <h1 className="text-gray-400 text-sm">{expense.category}</h1>
                                    </div>
                                </div>
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
                        state.expenses.filter((expense) => {
                            const today = new Date();
                            const date = new Date(expense.date);
                            return date.getDate() < today.getDate() - 1;
                        }
                        ).map((expense) => (
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex  justify-between items-center">
                                    {expense.category === "Housing" ? <div className="bg-red-800 rounded-full p-5">🏠</div> : null}
                                    {expense.category === "Food" ? <div className="bg-yellow-800 rounded-full p-5">🍗</div> : null}
                                    {expense.category === "Saving" ? <div className="bg-green-800 rounded-full p-5">💸</div> : null}

                                    <div className="ml-3">
                                        <h1 className="text-white text-lg">{expense.name}</h1>
                                        <h1 className="text-gray-400 text-sm">{expense.category}</h1>

                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-white text-xl text-right">- {expense.amount}</h1>

                                </div>
                            </div>
                        ))
                    }

                </div>

            </div>
        </div>
    );
}

export default PlannedExpenses;