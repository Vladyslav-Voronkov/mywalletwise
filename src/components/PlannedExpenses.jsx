import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Header from '../components/Header/Header';

// Categories icons
import home from "../img/icons/home.svg";
import food from "../img/icons/food.svg";
import saving from "../img/icons/saving.svg";
import tansport from "../img/icons/transport.svg";
import clothing from "../img/icons/clothing.svg";
import health from "../img/icons/health.svg";
import entertainment from "../img/icons/entertainment.svg";
import other from "../img/icons/other.svg";
import bell from "../img/icons/bell.svg";

import logo from "../img/logo.png"
import x from "../img/icons/x.svg"

import ExpensesChart from "./ExpensesChart";
import Target from "./Target";
import Categories from "./Categories";
import Spendings from "./Spendings";
import ModalAccountSettings from "./ModalAccountSettings";
import ModalAddTarget from "./ModalAddTarget";
import ModalSetBudget from "./ModalSetBudget";
import ModalAddExpense from "./ModalAddExpense";

const prodServer = "https://wallet-wise-6fd456725a95.herokuapp.com";
const PlannedExpenses = () => {

    // new expense state
    const [newExpense, setNewExpense] = useState({
        name: "",
        amount: "",
        category: "",
        date: "",
        notes: "",
    });
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        axios.get('https://wallet-wise-6fd456725a95.herokuapp.com/api/data')
            .then(response => {
            //     set expenses from database to state where username = localstorage username
                if(JSON.parse(localStorage.getItem("user"))){
                    setExpenses(response.data.filter(expense => expense.user === JSON.parse(localStorage.getItem("user")).username));
                } else {
                    setExpenses([]);
                }
            //     close preloader
                document.getElementById("preloader").style.display = "none";
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerDate, setRegisterDate] = useState(new Date());
    const [lastActivityDate, setLastActivityDate] = useState(new Date());

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Создаем объект с данными пользователя
        const user = {
            username: username,
            email: email,
            password: password,
            registerDate: registerDate,
            lastActivityDate: lastActivityDate,
        };

        // Отправляем данные на сервер
        fetch('https://wallet-wise-6fd456725a95.herokuapp.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user === 'user added successfully') {
                    // Сохраняем пользователя в локальное хранилище браузера
                    localStorage.setItem('user', JSON.stringify(user));
                //     close register modal and login modal
                    document.getElementById("reg").style.transform = "translateX(100rem)";
                    document.getElementById("reg").style.opacity = "0";
                    document.getElementById("reg").style.transition = "all 0.5s ease";
                    document.getElementById("login").style.transform = "translateX(100rem)";
                    document.getElementById("login").style.opacity = "0";
                    document.getElementById("login").style.transition = "all 0.5s ease";
                    window.location.reload();
                } else {
                    console.log('Registration failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleLogin = (event) => {
        event.preventDefault();

        // Создаем объект с данными пользователя
        const user = {
            username: username,
            password: password,
        };

        // Отправляем данные на сервер
        fetch('https://wallet-wise-6fd456725a95.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user === 'user found successfully') {
                    // Сохраняем пользователя в локальное хранилище браузера
                    localStorage.setItem('user', JSON.stringify(user));
                    //     close register modal and login modal
                    document.getElementById("reg").style.transform = "translateX(100rem)";
                    document.getElementById("reg").style.opacity = "0";
                    document.getElementById("reg").style.transition = "all 0.5s ease";
                    document.getElementById("login").style.transform = "translateX(100rem)";
                    document.getElementById("login").style.opacity = "0";
                    document.getElementById("login").style.transition = "all 0.5s ease";
                    window.location.reload();
                } else {
                    document.getElementById("error_login").style.display = "block";
                    document.getElementById("error_login").innerHTML = "Wrong username or password";
                }
            })
            .catch((error) => {
                document.getElementById("error_login").style.display = "block";
                document.getElementById("error_login").innerHTML = "Wrong username or password";
                console.error('Error:', error);
            });
    }


    const state = {
        expenses: [],
        balance: 0,
        budget: 1000,
        expCategories: [],
        targetName: "",
        targetAmount: 0,
        avatar_name: "avatar_1",
    }

    // get expenses data from https://wallet-wise-6fd456725a95.herokuapp.com/api/expenses

    // load avatar from local storage
    const loadAvatar = () => {
        if (localStorage.getItem("avatar_name") !== null) {
            state.avatar_name = localStorage.getItem("avatar_name");
        }
    }
    loadAvatar();

    // when page is loaded then close preloader react

    // open and close the modal_notifications
    const opencloseModalNotifications = () => {
        if (document.getElementById("modal_notifications").style.display === "none") {
            document.getElementById("modal_notifications").style.display = "block";
        } else {
            document.getElementById("modal_notifications").style.display = "none";
        }
    }

    const calculateBalance = () => {
        let total = 0;
        expenses.map((expense) => {
            // convert expense amount to int
            expense.amount = parseInt(expense.amount);
            total += expense.amount;
        })
        state.balance = total;
    }
    calculateBalance();

    const openModal = (
        cat
                       ) => {
        // document.getElementById("modal_ADD_EXPENSE").style.display = "flex";
        document.getElementById("modal_ADD_EXPENSE").style.transform = "translateX(0rem)";
        document.getElementById("modal_ADD_EXPENSE").style.opacity = "1";
        document.getElementById("modal_ADD_EXPENSE").style.transition = "all 0.5s ease";
        document.getElementById("category_selector").classList.add("opacity-0");
        document.getElementById("img_add").classList.add("rotate-45");
        document.getElementById("category_selector").classList.add("translate-x-72");
        document.getElementById("exp_cat").innerHTML = cat;



    };

    const AddExpense = () => {
        const name = document.getElementById("name").value;
        const amount = document.getElementById("amount").value;
        const category = document.getElementById("exp_cat").innerHTML
        const date = document.getElementById("date").value;
        const notes = document.getElementById("notes").value;

       // set new expense to state
        setNewExpense({
            user: JSON.parse(localStorage.getItem("user")).username,
            name: name,
            amount: amount,
            category: category,
            date: date,
            notes: notes,
        });

        // create new expense object

        const newExpense = {
            user: JSON.parse(localStorage.getItem("user")).username,
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

        axios.post("https://wallet-wise-6fd456725a95.herokuapp.com/api/add", newExpense).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        } );

        // save to local storage
        state.expenses.push(newExpense);
        localStorage.setItem("expenses", JSON.stringify(state.expenses));
        calculateBalance();
        // update expense state
        setExpenses([...expenses, newExpense]);
    //    hide modal

        document.getElementById("modal_ADD_EXPENSE").style.transform = "translateX(-96rem)";
        document.getElementById("modal_ADD_EXPENSE").style.opacity = "0";
        document.getElementById("modal_ADD_EXPENSE").style.transition = "all 0.5s ease";
    }

    const calculateCategoriesSum = () => {
        // calculate sum of all categories in expenses array
        expenses.map((expense) => {
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
        // find this name in localstorage

        const categories = JSON.parse(localStorage.getItem("expenses"));
        // get categories with key expenses from https://wallet-wise-6fd456725a95.herokuapp.com/api/data

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

    // Register function, to https://wallet-wise-6fd456725a95.herokuapp.com/api/register route username password email register date and last activity date axios
    const Register = async () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;
        const registerDate = new Date().toISOString().slice(0, 10);
        const lastActivityDate = new Date().toISOString().slice(0, 10);
        const data = {
            username: username,
            password: password,
            email: email,
            registerDate: registerDate,
            lastActivityDate: lastActivityDate
        }
        await axios.post("https://wallet-wise-6fd456725a95.herokuapp.com/api/register", data);
    //  set localstorage to username if register is success
        localStorage.setItem("username", data.username);
    }

    updateTarget();

    return (
        <>
            <div id="bg_particles" className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

        <Header
            notificationsOPCL = {opencloseModalNotifications}
            notifications={document.getElementById("modal_notifications")}
        />
        <div id="top" className="overflow-y-hidden pt-24 bg-[#1a1a1a] bg-opacity-0">


            <div id="top"></div>

            {/* `preloader` */}
            <div id="preloader" className="fixed  top-0 left-0 bg-[#1D1D1D] bg-opacity-50 backdrop-blur-md z-[1000] w-full h-screen flex justify-center items-center">
                <div className="flex items-center flex-col ">
                    <img width={200} src={logo} alt="" />
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                        <p id="longLoad" className="text-white text-center text-sm text-gray-400 hidden ">Loading is too long? Check your internet connection</p>

                </div>
                {
                    setTimeout(() => {
                        document.getElementById("longLoad").classList.remove("hidden");
                    }
                        , 5000)
                }
            </div>

            {/* Modal window notifications */}
            <div id="modal_notifications" className="duration-500 bg-opacity-0
             -translate-y-[96rem] fixed top-0 left-0 bg-[#1D1D1D] bg-opacity-50 backdrop-blur-md z-50 mt-20 w-2/2 mx-5 p-10 rounded-md flex justify-center items-center
           ">
                <div className="flex items-center flex-col ">
                    <p className="text-white text-center text-2xl font-bold mt-2 flex">
                        <img src={bell} alt="" className="w-7 mr-1 self-center inline-block" />
                        Notifications</p>
                    <div className="text-center mt-5 flex flex-col">
                        {/*<p className="text-white text-center text-sm font-bold mt-2">You have no notifications</p>*/}
                       <h1 className="text-md text-white">Update 0.1.2</h1>
                        <ul className="text-xs text-gray-400 text-left">
                            <li>- ADDED PLN CURRENCY</li>
                            <li>- REMOVED FILTER FOR YESTERDAY</li>
                            <li>- ADDED DATES FOR EARLIER EXPENSES</li>
                            <li>- ADDED PARTICLES BACKGROUND</li>
                            <li>- NEW ADDING EXPENSE MENU</li>
                            <li>- WHEN EXPENSES > 70% COLOR RED</li>
                            <li>- ADDED NOTIFICATIONS CENTER</li>
                            <li>- BUG FIXED WHEN ADDING MORE THAN 1 EXPENSE IT WASN'T ADDED</li>
                            <li>- FIXED 13 SMALL BUGS</li>
                            <li>- TEMPORARY REMOVED A TARGET MODULE</li>
                        </ul>
                        <p className="text-xs text-gray-300 text-right">24.06.2023</p>
                    </div>
                </div>
            </div>

            {/* Modal window register */}
            {
                localStorage.getItem("user")
                === null ?
                    (<div id="reg" className="hidden fixed top-0 left-0 bg-[#1D1D1D] bg-opacity-50 backdrop-blur-md z-[999999] w-full h-screen flex justify-center items-center ">
                        <div className="flex items-center flex-col ">
                            <img width={200} src={logo} alt="" />
                            <p className="text-white text-center text-2xl font-bold mt-2">Register</p>
                            <form
                                onSubmit={handleSubmit}
                                className="text-center mt-5 flex flex-col">
                                {/*username*/}
                                <input value={username} onChange={handleUsernameChange} id="username" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500" type="text" placeholder="Username" />
                                <input value={email} onChange={handleEmailChange} id="email" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2" type="email" placeholder="Email" />
                                <input value={password} onChange={handlePasswordChange} id="password" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2" type="password" placeholder="Password" />
                                {/*input with date hidden*/}
                                <input id="date_register" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2 hidden" type="date" placeholder="Date" />
                                {/*date last activity*/}
                                <input id="date_last_activity" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2 hidden" type="date" placeholder="Date" />
                                <button className="w-72 h-10 bg-blue-500 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2">Register</button>
                            </form>
                            {/* already has an account */}
                            <p className="text-white text-center text-sm mt-2">Already have an account? <span onClick={() => {
                                document.getElementById("reg").classList.add("hidden");
                                document.getElementById("login").classList.remove("hidden");
                            }} className="text-blue-500 cursor-pointer">Login</span></p>
                            <p id="error_register" className="text-white text-center text-sm text-gray-400 hidden">Error</p>
                        </div>
                    </div>) : (<> </>)
            }

            {/* login modal */}
            {
                localStorage.getItem("user") ? (<> </>) :
                    (
                        <div id="login" className="fixed top-0 left-0 bg-[#1D1D1D] bg-opacity-50 backdrop-blur-md z-[999999] w-full h-screen flex justify-center items-center ">
                            <div className="flex items-center flex-col ">
                                <img width={200} src={logo} alt="" />
                                <p className="text-white text-center text-2xl font-bold mt-2">Login</p>
                                <form
                                    onSubmit={handleLogin}
                                    className="text-center mt-5 flex flex-col">
                                    {/*username*/}
                                    <input value={username} onChange={handleUsernameChange} id="username_login" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500" type="text" placeholder="Username" />
                                    <input value={password} onChange={handlePasswordChange} id="password_login" className="w-72 h-10 bg-[#1D1D1D] border border-gray-600 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2" type="password" placeholder="Password" />
                                    <button className="w-72 h-10 bg-blue-500 rounded-md text-white text-sm px-4 outline-none focus:border-blue-500 mt-2">Login</button>
                                </form>
                                {/*dont have accont register*/}
                                <p className="text-white text-center text-sm mt-2">Don't have an account? <span onClick={() => { document.getElementById("reg").classList.remove("hidden"); document.getElementById("login").classList.add("hidden") }} className="text-blue-500 cursor-pointer">Register</span></p>
                                <p id="error_login" className="text-red-500 text-center text-sm hidden">Error</p>
                            </div>
                        </div>
                    )
            }

            {/* modal window adding a expense */}
            <ModalAddExpense
                state={state}
                changecategory={changeCategory}
                addexpense={AddExpense}
            />

            {/* modal window with setting budget for the month */}
            <ModalSetBudget
                state={state}
            />

            {/* Modal add a target */}
            <ModalAddTarget
                state={state}
                addtarget={addTarget}
            />

            {/* Modal account settings */}
            <ModalAccountSettings
                state={state}
            />


            {/* Top panel */}
            <div id="top" className="fixed w-full sm:w-3/3 sm:m-auto bg-[#1a1a1a] bg-opacity-0 sm:static">
                {/* Expenses and chart */}
                {/*form chat gpt*/}

                <ExpensesChart
                    balance={state.balance}
                    budget={state.budget}
                    openmodalbudget={openModalBudget}
                />
                {/* Cards with expenses */}
                <div className="relative flex items-center sm:justify-center overflow-x-scroll sm:overflow-x-hidden pt-10 pb-5 sm:flex-wrap m-auto ">
                    <Categories
                        state={state}
                        modalopen={openModal}
                    />
                    {/* Add Category button*/}



                </div>
            </div>

            <div className="z-50 bg-white">
                <div onClick={
                    () => {
                        document.getElementById("category_selector").classList.toggle("opacity-0");
                        document.getElementById("img_add").classList.toggle("rotate-45");
                        document.getElementById("category_selector").classList.toggle("translate-x-72");
                    }
                } className="py-5 shrink-0
                        bg-gradient-to-t
                       self-stretch w-14 h-14 flex justify-center items-center text-white text-4xl
                       duration-300 cursor-pointer fixed bottom-0 right-0 mb-20 mr-5 z-50 rounded-full
                       bg-[#4e54c8]
                       ">
                    <img id="img_add" src={x} alt="x_icon" className="w-7 h-7 rotate-45 duration-300" />

                </div>

                <div id="category_selector" className="flex p-5 z-50 fixed bottom-0 translate-x-72 right-0 mb-20 mr-24 opacity-0 duration-300 bg-[#4e54c8] p-2 rounded-xl">
                   <div>
                       <div onClick={
                            () => {
                                openModal("Housing");
                            }
                       } className=" bg-black bg-opacity-30 backdrop-blur-md rounded-full p-2
                        cursor-pointer hover:bg-opacity-50 duration-300 "><img src={home} alt="home"/></div>
                       <div  onClick={
                           () => {
                               openModal("Food");
                           }
                       } className=" bg-black bg-opacity-30 backdrop-blur-md rounded-full p-2
                        cursor-pointer hover:bg-opacity-50 duration-300 my-2 +"><img src={food} alt="home"/></div>
                       <div onClick={
                           () => {
                               openModal("Saving");
                           }}
                           className=" bg-black bg-opacity-30 backdrop-blur-md rounded-full p-2
                        cursor-pointer hover:bg-opacity-50 duration-300 "><img src={saving} alt="ent"/> </div>
                   </div>

                    <div className="ml-5">
                        <div onClick={
                            () => {
                                openModal("Transport");
                            }} className=" bg-black bg-opacity-30 backdrop-blur-md rounded-full p-2
                        cursor-pointer hover:bg-opacity-50 duration-300 "><img src={tansport} alt="home"/></div>
                        <div onClick={
                            () => {
                                openModal("Clothing");
                            }} className=" bg-black bg-opacity-30 backdrop-blur-md rounded-full p-2
                        cursor-pointer hover:bg-opacity-50 duration-300 my-2 +"><img src={clothing} alt="home"/></div>
                        <div onClick={
                            () => {
                                openModal("Health");
                            }} className=" bg-black bg-opacity-30 backdrop-blur-md rounded-full p-2
                        cursor-pointer hover:bg-opacity-50 duration-300 "><img src={health} alt="ent"/> </div>
                    </div>

                    <div className="ml-5">
                        <div onClick={
                            () => {
                                openModal("Entertainment");
                            }} className=" bg-black bg-opacity-30 backdrop-blur-md rounded-full p-2
                        cursor-pointer hover:bg-opacity-50 duration-300 "><img src={entertainment} alt="home"/></div>
                        <div onClick={
                            () => {
                                openModal("Other");
                            }} className=" bg-black bg-opacity-30 backdrop-blur-md rounded-full p-2
                        cursor-pointer hover:bg-opacity-50 duration-300 my-2 +"><img src={other} alt="home"/></div>
                    </div>

                </div>

            </div>
            {/* Spendings */}
            <Spendings
                state={state}
                expenses={expenses}
            />
        </div>
        </>
    );
}

export default PlannedExpenses;