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

        // if amount is null
        if (amount === "") {
            newExpense.amount = 0;
        }


        // if data not getted then set default value
        if (date === "") {
            newExpense.date = new Date().toISOString().slice(0, 10);
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

    // get expenses from api port 5000
    const getExpenses = async () => {

        const res = await fetch("/expenses");
        const data = await res.json();
        state.expenses = data;
        calculateBalance();
    }


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

    // open modal window for setting budget
    const openModalBudget = () => {
        document.getElementById("modal_SET_BUDGET").style.display = "flex";
    }

    // set budget
    const setBudget = () => {
        // when we set budget we need to calculate dynamic budget
        // if dynamic budget is true then calculate dynamic budget
        if (localStorage.getItem("dynamic_budget") === "true") {
            dynamicBudget();
        }
        
        state.budget = document.getElementById("budget").value;
        if(state.budget === "") {
            state.budget = 0;
        }

        localStorage.setItem("budget", state.budget);
        document.getElementById("modal_SET_BUDGET").style.display = "none";
        window.location.reload();
    }

    // get budget from local storage
    const getBudget = () => {
        if (localStorage.getItem("budget") !== null) {
            state.budget = localStorage.getItem("budget");
        }
    }

    getBudget();

    // dynamic budget
    const dynamicBudget = () => {
        // dynamicaly expand budget i need to set budget that be calculated by your daily expenses and set monthly budget
        // for example if you spend 100$ per day then your budget will be 3000$ per month
        // if you spend 50$ per day then your budget will be 1500$ per month
        
        // get all expenses
        const expenses = JSON.parse(localStorage.getItem("expenses"));
        // if expenses is not defined or empty then set budget to 0
        if (expenses === null || expenses.length === 0) {
            state.budget = 0;
            localStorage.setItem("budget", state.budget);
            window.location.reload();
        }
        // get all dates only last week 
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
            dates.push(date.toISOString().slice(0, 10));
        }

        // get unique dates
        const uniqueDates = [...new Set(dates)];
        // get all expenses by date
        const expensesByDate = [];
        uniqueDates.map((date) => {
            expensesByDate[date] = 0;
        }

        )
        // calculate sum of all expenses by date
        expenses.map((expense) => {
            expensesByDate[expense.date] += parseInt(expense.amount);
        }
        )
        // calculate average expenses per day
        let averageExpenses = 0;
        let totalExpenses = 0;
        for (let i = 0; i < uniqueDates.length; i++) {
            totalExpenses += expensesByDate[uniqueDates[i]];
        }
        averageExpenses = totalExpenses / uniqueDates.length;
        // calculate budget for month and convert to int
        state.budget = parseInt(averageExpenses * 30);
        localStorage.setItem("budget", state.budget);
        

    }
    
    // if localstorage dynamic_budget is true then calculate dynamic budget one time per day
    if (localStorage.getItem("dynamic_budget") === "true") {
        dynamicBudget();
    }
    
    const changeCategory = () => {
        // get id name value and set id option value category from localstorage same names
        const name = document.getElementById("name").value;
        const category = document.getElementById("category");
        // find this name in localstorage
        const categories = JSON.parse(localStorage.getItem("expenses"));
        // if categories is not defined then set categories to empty array
        if (categories === null || categories.length === 0 || categories === undefined) {
            localStorage.setItem("categories", JSON.stringify([]));
            return;
        }
        // if categories is not empty then find this name in categories
        if (categories.length !== 0) {
            categories.map((category) => {
                if (category.name === name) {
                    // if name is found then set category to this category
                    category = category.category;
                    // set option value to this category
                    document.getElementById("category").value = category;
                }
            })
        }
    }


    calculateCategoriesSum();

    return (
        <div className="overflow-y-hidden pt-24 bg-[#000]">

            {/* modal window adding a expense */}
            <div
                id="modal_ADD_EXPENSE"
                className="z-50 hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center backdrop-blur-md">
                <div className="bg-[#000] rounded-2xl w-full mx-2 h-2/2">
                    <div className="flex justify-between items-center px-5 py-3">
                        <h1 className="text-2xl text-white">Add Expense</h1>
                        <button className="text-2xl text-white" onClick={() => {
                            document.getElementById("modal_ADD_EXPENSE").style.display = "none";
                        }}>X</button>
                    </div>
                    <div className="px-5 py-3">
                        <div className="flex justify-between items-center">
                            <input onChange={changeCategory} placeholder="Name" id="name" name="name" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent" type="text" />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <input placeholder="Amount" id="amount" name="amount" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent" type="text" />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <select id="category" name="category" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent">
                                <option value="Housing">🏠Housing</option>
                                <option value="Food">🍗Food</option>
                                <option value="Saving">💸Saving</option>
                                <option value="Transport">🚗Transport</option>
                                <option value="Clothing">👕Clothing</option>
                                <option value="Health">🏥Health</option>
                                <option value="Entertainment">🎮Entertainment</option>
                                <option value="Other">📦Other</option>
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
                            <button onClick={addExpense} className="bg-green-500 w-full rounded-2xl px-5 py-2 text-white">Add</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal window with setting budget for the month */}
            <div
                id="modal_SET_BUDGET"
                className="z-50 hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center backdrop-blur-md">
                <div className="bg-[#000] rounded-2xl w-2/2 h-2/2">
                    <div className="flex justify-between items-center px-5 py-3">
                        <h1 className="text-2xl text-white">Set Budget</h1>
                        <button className="text-2xl text-white" onClick={() => {
                            document.getElementById("modal_SET_BUDGET").style.display = "none";
                        }}>X</button>
                    </div>
                    <div className="px-5 py-3">
                        <div className="flex flex-col justify-between items-center">
                            <h1 className="text-xl text-white">Budget</h1>
                            <input
                                value = { localStorage.getItem("dynamic_budget") === "true" ? state.budget : null}
                                placeholder={ state.budget }
                                id="budget" name="budget" className="border border-gray-400 w-full mt-2 text-white rounded-md px-3 py-1  text-center text-2xl outline-none bg-transparent" type="text" />
                            {/* checkbox "Dynamic budget" */}
                            <br />
                            <div className="flex flex-col items-center">
                                {/* Чекбокс кастомный красивый */}
                                <div className="flex items-center justify-between">
                                    <input
                                    
                                    checked = { localStorage.getItem("dynamic_budget") === "true" ? true : false }
                                    onChange = { () => {
                                        if (localStorage.getItem("dynamic_budget") === "true") {
                                            localStorage.setItem("dynamic_budget", false);
                                            window.location.reload();
                                        } else {
                                            localStorage.setItem("dynamic_budget", true);
                                            window.location.reload();
                                        }
                                    }
                                   
                                }
                                    className="w-5 h-5 border border-gray-400 rounded-md"  
                                    type="checkbox" id="dynamic_budget" name="dynamic_budget" value="dynamic_budget" />
                                    <label className="ml-2 text-white" htmlFor="dynamic_budget">Dynamic budget</label>
                                </div>
                                {/* подсказка при наведении типо функция работает с нейросетью и на ее основе динамически разширяет бюджет */}
                                <div className="text-gray-400 text-sm">*Dynamic budget is a function that works with neural network and based on it dynamically expands the budget</div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-5">
                            <button onClick={() => {
                                state.budget = document.getElementById("budget").value;
                                localStorage.setItem("budget", state.budget);
                                document.getElementById("modal_SET_BUDGET").style.display = "none";
                                window.location.reload();
                            }} className="bg-gray-500 w-full rounded-md px-5 py-2 text-white">Set</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Top panel */}
            <div className="fixed w-full bg-[#000]">
                {/* Expenses and chart */}
                <div className="mx-5 flex  justify-between items-center">
                    <div>
                        <span className="text-gray-400">Planned Expenses</span>
                        <h1 className="text-4xl mt-3 text-white">{state.balance}</h1>
                        {/* Изменить прикол с удалением инфы при нажатиия ( убрать его) */}
                        <div
                            onClick={openModalBudget}
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
                            <div className="shrink-0 bg-gradient-to-t from-red-500 to-purple-900 w-2/5 drop-shadow-xl p-5 text-white rounded-3xl ml-5">
                                <h1>{key === "Housing" ? "🏠Housing" : ""}
                                    {key === "Food" ? "🍗Food" : ""}
                                    {key === "Saving" ? "💸Saving" : ""}
                                    {key === "Transport" ? "🚗Transport" : ""}
                                    {key === "Clothing" ? "👕Clothing" : ""}
                                    {key === "Health" ? "🏥Health" : ""}
                                    {key === "Entertainment" ? "🎮Entertai..." : ""}
                                    {key === "Other" ? "📦Other" : ""}
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
                                    {expense.category === "Transport" ? <div className="bg-blue-800 rounded-full p-5">🚗</div> : null}
                                    {expense.category === "Clothing" ? <div className="bg-purple-800 rounded-full p-5">👕</div> : null}
                                    {expense.category === "Health" ? <div className="bg-pink-800 rounded-full p-5">🏥</div> : null}
                                    {expense.category === "Entertainment" ? <div className="bg-indigo-800 rounded-full p-5">🎮</div> : null}
                                    {expense.category === "Other" ? <div className="bg-gray-800 rounded-full p-5">📦</div> : null}
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
                                    {expense.category === "Transport" ? <div className="bg-blue-800 rounded-full p-5">🚗</div> : null}
                                    {expense.category === "Clothing" ? <div className="bg-purple-800 rounded-full p-5">👕</div> : null}
                                    {expense.category === "Health" ? <div className="bg-pink-800 rounded-full p-5">🏥</div> : null}
                                    {expense.category === "Entertainment" ? <div className="bg-indigo-800 rounded-full p-5">🎮</div> : null}
                                    {expense.category === "Other" ? <div className="bg-gray-800 rounded-full p-5">📦</div> : null}
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
                                    {expense.category === "Transport" ? <div className="bg-blue-800 rounded-full p-5">🚗</div> : null}
                                    {expense.category === "Clothing" ? <div className="bg-purple-800 rounded-full p-5">👕</div> : null}
                                    {expense.category === "Health" ? <div className="bg-pink-800 rounded-full p-5">🏥</div> : null}
                                    {expense.category === "Entertainment" ? <div className="bg-indigo-800 rounded-full p-5">🎮</div> : null}
                                    {expense.category === "Other" ? <div className="bg-gray-800 rounded-full p-5">📦</div> : null}

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