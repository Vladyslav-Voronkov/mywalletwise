import React from "react";
import { ReactDOM } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import avatar_1_preview from "../../img/avatar-1-preview.webp"
import avatar_2_preview from "../../img/avatar-2-preview.webp"
import avatar_3_preview from "../../img/avatar-3-preview.webp"
import avatar_4_preview from "../../img/avatar-4-preview.webp"
import avatar_5_preview from "../../img/avatar-5-preview.webp"

import logo from "../../img/logo.png"

const PlannedExpenses = () => {

    const state = {
        expenses: [],
        balance: 0,
        budget: 1000,
        expCategories: [],
        targetName: "",
        targetAmount: 0,
        avatar_name: "avatar_1",
    }

    // load avatar from local storage
    const loadAvatar = () => {
        if (localStorage.getItem("avatar_name") !== null) {
            state.avatar_name = localStorage.getItem("avatar_name");
        }
    }
    loadAvatar();

    // when page is loaded then close preloader react
    React.useEffect(() => {
        document.getElementById("preloader").style.display = "none";
    }, [])



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
        // document.getElementById("modal_ADD_EXPENSE").style.display = "flex";
        document.getElementById("modal_ADD_EXPENSE").style.transform = "translateX(0rem)";
        document.getElementById("modal_ADD_EXPENSE").style.opacity = "1";
        document.getElementById("modal_ADD_EXPENSE").style.transition = "all 0.5s ease";

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
        if (state.budget === "") {
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
        // set name to preview
        document.getElementById("preview_name").innerHTML = name;
        // change icon and category preview
        if (category.value === "Housing") {
            document.getElementById("preview_category").innerHTML = "Housing";
            document.getElementById("preview_category_icon").innerHTML = "🏠";
        }
        if (category.value === "Food") {
            document.getElementById("preview_category").innerHTML = "Food";
            document.getElementById("preview_category_icon").innerHTML = "🍗";
        }
        if (category.value === "Saving") {
            document.getElementById("preview_category").innerHTML = "Saving";
            document.getElementById("preview_category_icon").innerHTML = "💸";
        }
        if (category.value === "Transport") {
            document.getElementById("preview_category").innerHTML = "Transport";
            document.getElementById("preview_category_icon").innerHTML = "🚗";
        }
        if (category.value === "Clothing") {
            document.getElementById("preview_category").innerHTML = "Clothing";
            document.getElementById("preview_category_icon").innerHTML = "👕";
        }
        if (category.value === "Health") {
            document.getElementById("preview_category").innerHTML = "Health";
            document.getElementById("preview_category_icon").innerHTML = "🏥";
        }
        if (category.value === "Entertainment") {
            document.getElementById("preview_category").innerHTML = "Entertainment";
            document.getElementById("preview_category_icon").innerHTML = "🎮";
        }
        if (category.value === "Other") {
            document.getElementById("preview_category").innerHTML = "Other";
            document.getElementById("preview_category_icon").innerHTML = "📦";
        }

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

    // Add target
    const addTarget = () => {
        const name = document.getElementById("name_target").value;
        const amount = document.getElementById("amount_target").value;

        // set target name to local storage
        localStorage.setItem("targetName", name);
        localStorage.setItem("targetAmount", amount);
        document.getElementById("modal_ADD_TARGET").style.display = "none";
        window.location.reload();
    }

    // update target
    const updateTarget = () => {
        if (localStorage.getItem("targetName") !== "") {
            state.targetName = localStorage.getItem("targetName");
            state.targetAmount = localStorage.getItem("targetAmount");
        }
    }

    updateTarget();

    return (
        <div id="top" className="overflow-y-hidden pt-24 bg-[#1a1a1a] bg-opacity-0">
            <div id="top"></div>

            {/* preloader */}
            <div id="preloader" className="fixed  top-0 left-0 bg-[#1D1D1D] bg-opacity-50 backdrop-blur-md z-50 w-full h-screen flex justify-center items-center">
                <img width={200} src={logo} alt="" />
            </div>

            {/* modal window adding a expense */}
            <div
                id="modal_ADD_EXPENSE"
                className="z-50 -translate-x-[96rem] fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-xl justify-center items-center">
                <div className="bg-[#111] bg-opacity-50 translate-y-10 backdrop-blur-md rounded-2xl w-3/3 mx-2 h-2/2">

                    <div className="flex justify-between items-center px-5 py-3">

                        <h1 className="text-2xl text-white">Add Expense</h1>


                        <button className="text-2xl text-white" onClick={() => {
                            // document.getElementById("modal_ADD_EXPENSE").style.display = "none";
                            document.getElementById("modal_ADD_EXPENSE").style.transform = "translateX(-96rem)";
                            document.getElementById("modal_ADD_EXPENSE").style.opacity = "0";
                            document.getElementById("modal_ADD_EXPENSE").style.transition = "all 0.9s ease";
                        }}>X</button>
                    </div>

                    {/* Preview block */}
                    <h1 className="text-white text-xl px-5 pb-2">Preview</h1>
                    <div className="flex justify-between items-center mx-5 px-2 rounded-md  border-white border py-2">
                        <div className="flex justify-between items-center">
                            <div id="preview_category_icon" className="bg-red-800 rounded-full p-5">🏠</div>
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
                            <input onChange={changeCategory

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
                                    // set preview category
                                    if (category === "Housing") {
                                        document.getElementById("preview_category").innerHTML = "Housing";
                                        document.getElementById("preview_category_icon").innerHTML = "🏠";
                                    }
                                    if (category === "Food") {
                                        document.getElementById("preview_category").innerHTML = "Food";
                                        document.getElementById("preview_category_icon").innerHTML = "🍗";
                                    }
                                    if (category === "Saving") {
                                        document.getElementById("preview_category").innerHTML = "Saving";
                                        document.getElementById("preview_category_icon").innerHTML = "💸";
                                    }
                                    if (category === "Transport") {
                                        document.getElementById("preview_category").innerHTML = "Transport";
                                        document.getElementById("preview_category_icon").innerHTML = "🚗";
                                    }
                                    if (category === "Clothing") {
                                        document.getElementById("preview_category").innerHTML = "Clothing";
                                        document.getElementById("preview_category_icon").innerHTML = "👕";
                                    }
                                    if (category === "Health") {
                                        document.getElementById("preview_category").innerHTML = "Health";
                                        document.getElementById("preview_category_icon").innerHTML = "🏥";
                                    }
                                    if (category === "Entertainment") {
                                        document.getElementById("preview_category").innerHTML = "Entertainment";
                                        document.getElementById("preview_category_icon").innerHTML = "🎮";
                                    }
                                    if (category === "Other") {
                                        document.getElementById("preview_category").innerHTML = "Other";
                                        document.getElementById("preview_category_icon").innerHTML = "📦";
                                    }
                                }

                            } id="category" name="category" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent">
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
                className="z-50 hidden fixed top-0 left-0 w-full h-full bg-black  bg-opacity-50 justify-center items-center backdrop-blur-md">
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
                                value={localStorage.getItem("dynamic_budget") === "true" ? state.budget : null}
                                placeholder={state.budget}
                                id="budget" name="budget" className="border border-gray-400 w-full mt-2 text-white rounded-md px-3 py-1  text-center text-2xl outline-none bg-transparent" type="text" />
                            {/* checkbox "Dynamic budget" */}
                            <br />
                            <div className="flex flex-col items-center">
                                {/* Чекбокс кастомный красивый */}
                                <div className="flex items-center justify-between">
                                    <input

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

            {/* Modal add a target */}
            <div
                id="modal_ADD_TARGET"
                className="z-50 -translate-x-96 fixed top-0 left-0 w-3/3  h-full justify-center items-center">
                <div className="bg-[#000] bg-opacity-50 backdrop-blur-md translate-y-52 rounded-2xl w-full mx-2 h-2/2">
                    <div className="flex justify-between items-center px-5 py-3">
                        <h1 className="text-2xl text-white">Edit Target</h1>
                        <button className="text-2xl text-white" onClick={() => {
                            document.getElementById("modal_ADD_TARGET").style.transform = "translateX(-96rem)";
                        }}>X</button>
                    </div>
                    <div className="px-5 py-3">
                        <div className="flex justify-between items-center">
                            <input placeholder={
                                state.targetName === "" ? "Name" : state.targetName
                            } id="name_target" name="name_target" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent" type="text" />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <input placeholder={
                                state.targetAmount === "" ? "Amount" : state.targetAmount
                            } id="amount_target" name="amount_target" className="w-full text-center text-2xl border border-gray-400 text-white rounded-md px-3 py-1 outline-none bg-transparent" type="text" />
                        </div>
                        <div className="flex justify-center items-center mt-5">
                            <button onClick={addTarget} className="bg-green-500 w-full rounded-2xl px-5 py-2 text-white">Add</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal account settings */}
            <div
                id="modal_ACCOUNT_SETTINGS"
                className="duration-500 -translate-y-[96rem] z-50 fixed top-0 left-0 w-full h-full md:w-1/3 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-[#000] bg-opacity-50 rounded-2xl backdrop-blur-md mx-2 w-full h-2/2">
                    <div className="flex justify-between items-center px-5 py-3">
                        <h1 className="text-2xl text-white">Account Settings</h1>
                        <button className="text-2xl text-white" onClick={() => {
                            document.getElementById("account_settings").style.display = "flex";
                            document.getElementById("avatar_selector").style.display = "none";
                            document.getElementById("modal_ACCOUNT_SETTINGS").style.transform = "translateY(-96rem)";
                            document.getElementById("modal_ACCOUNT_SETTINGS").style.opacity = "0";
                            document.getElementById("modal_ACCOUNT_SETTINGS").style.transition = "all 0.9s ease";
                            // document.getElementById("modal_ACCOUNT_SETTINGS").style.display = "none";
                            // translate x 
                        }}>X</button>

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
                                    className="bg-gradient-to-t from-red-500 to-yellow-900 w-14 h-14 rounded-full flex justify-center items-center text-white text-4xl active:bg-white">🙋‍♂️</button>
                                Avatar
                            </div>
                            <div className="text-white flex flex-col items-center ml-5">
                                <button className="bg-gradient-to-t from-green-500 to-blue-900 w-14 h-14 rounded-full flex justify-center items-center text-white text-4xl">🖌️</button>
                                Username
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


            </div>


            {/* Top panel */}
            <div id="top" className="fixed w-full md:w-3/3 md:m-auto bg-[#1a1a1a] bg-opacity-0 md:static">
                {/* Expenses and chart */}
                <div className="mx-5 flex justify-between md:mx-20 items-center">
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
                    <div>
                        <CircularProgressbar className="w-32 md:w-42 text-white" value={
                            state.balance / state.budget * 100 > 100 ? 100 : state.balance / state.budget * 100
                        } text={`${state.balance / state.budget * 100 > 100 ? 100 : (state.balance / state.budget * 100).toFixed()
                            }%`}
                            styles={{
                                root: {},
                                path: {
                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                    transformOrigin: 'center center',
                                    stroke: '#4976CDaa',
                                },
                                trail: {
                                    stroke: '#ffffff00',
                                    strokeLinecap: 'butt',

                                },
                                text: {
                                    fill: '#fff',
                                    fontSize: '25px',
                                },
                                background: {
                                    fill: '#ffffff00',
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Cards with expenses */}
                <div className="flex items-center md:justify-center px-5 overflow-x-scroll md:overflow-x-hidden pt-10 pb-5 md:flex-wrap m-auto ">
                    {/* Add Category */}


                    <div onClick={openModal} className="py-5 shrink-0 
                        bg-gradient-to-t bg-black bg-opacity-20 backdrop-blur-md
                       self-stretch w-14 rounded-2xl flex justify-center items-center text-white text-4xl active:bg-white
                       hover:bg-opacity-50 duration-300 cursor-pointer mt-5
                       ">+</div>

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
                                state.targetName === "" ? "No target" : state.targetAmount
                            }</h1>
                            {/* When i can buy it date*/}
                            <div className="mt-2 w-max bg-[#ffffff55] rounded-full px-3 py-1">🕑{
                                state.targetName === "" ? "No target" : "04.08.2023"
                            }</div>


                        </div>
                        <h1 className="text-lg font-bold mt-1">🎯Target</h1>
                    </div>

                    {/* Categories */}
                    {
                        Object.keys(state.expCategories).map((key) => (
                            <>
                                <div className="mt-5 w-3/5 md:w-1/6 self-stretch shrink-0 text-white text-center">
                                    <div
                                        className="shrink-0 bg-gradient-to-b
                                bg-black  bg-opacity-30 backdrop-blur-md
                            card
                           drop-shadow-xl p-5 text-white rounded-3xl text-center
                           hover:bg-opacity-50 duration-300 cursor-pointer ml-5
                          
                           ">

                                        <div className="flex flex-col justify-between items-center ">
                                            <h1 className=" text-4xl font-bold">{state.expCategories[key]}</h1>
                                            {/* <div className="mt-5 w-max  bg-[#ffffff55] rounded-full px-3 py-1">{(state.expCategories[key] / state.balance * 100).toFixed()}%</div> */}
                                            <CircularProgressbar className="w-20 mt-2 text-white" value={
                                                state.expCategories[key] / state.balance * 100 > 100 ? 100 : state.expCategories[key] / state.balance * 100
                                            } text={`${state.expCategories[key] / state.balance * 100 > 100 ? 100 : (state.expCategories[key] / state.balance * 100).toFixed()
                                                }%`}
                                                styles={{
                                                    root: {},
                                                    path: {
                                                        transition: 'stroke-dashoffset 0.5s ease 0s',
                                                        transformOrigin: 'center center',
                                                        stroke: '#4976CD',
                                                    },
                                                    trail: {
                                                        stroke: '#ffffff00',
                                                        strokeLinecap: 'butt',

                                                    },
                                                    text: {
                                                        fill: '#fff',
                                                        fontSize: '25px',
                                                    },
                                                    background: {
                                                        fill: '#ffffff00',
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <h1 className="text-lg font-bold">{key === "Housing" ? "🏠Housing" : ""}
                                            {key === "Food" ? "🍗Food" : ""}
                                            {key === "Saving" ? "💸Saving" : ""}
                                            {key === "Transport" ? "🚗Transport" : ""}
                                            {key === "Clothing" ? "👕Clothing" : ""}
                                            {key === "Health" ? "🏥Health" : ""}
                                            {key === "Entertainment" ? "🎮Entertai..." : ""}
                                            {key === "Other" ? "📦Other" : ""}
                                        </h1>
                                    </div>
                                </div>
                            </>

                        ))

                    }
                </div>
                {/* <h1 className="text-white text-2xl px-5 pb-2 ">Spending this month</h1> */}
            </div>

            {/* Spending this month */}
            <div className="my-10 pb-20 md:mt-5 mt-[410px] pt-5 backdrop-blur-sm  w-full px-5 overflow-x-hidden bg-black bg-opacity-80 z-40 absolute
             ">
                <a href="#top"><div className="w-32 h-1 rounded-full mt-2 bg-white m-auto absolute left-0 top-0 ml-32 md:hidden"></div></a>
                <div className="overflow-y-scroll md:overflow-y-hidden  overflow-x-hidden md:w-2/3 md:m-auto">
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
                            <div
                                id={expense.id}
                                className="flex justify-between items-center mt-4">
                                {/* delete button fixed and show when swipe*/}
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
                            <div className="flex justify-between items-center mt-4" >
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