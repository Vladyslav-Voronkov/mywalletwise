import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from './components/Header/Header';

// Categories icons
import ExpensesChart from "./components/ExpensesChart";
import Categories from "./components/Categories";
import Spendings from "./components/Spendings";
import ModalAccountSettings from "./components/Modals/ModalAccountSettings";
import ModalAddTarget from "./components/Modals/ModalAddTarget";
import ModalSetBudget from "./components/Modals/ModalSetBudget";
import ModalAddExpense from "./components/Modals/ModalAddExpense";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";
import AddExpenseBttn from "./components/AddExpenseBttn";
import NotificationCenter from "./components/Modals/NotificationCenter";
import Preloader from "./components/Preloader";
import CategoriesChart from "./components/CategoriesChart";
import ExpandCategories from "./components/ExpandCategories";

const Dashboard = () => {

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
                if (JSON.parse(localStorage.getItem("user"))) {
                    // filter expenses by username
                    setExpenses(response.data.filter(expense => expense.user === JSON.parse(localStorage.getItem("user")).username));
                    // setExpenses(response.data)
                    localStorage.setItem('expenses', JSON.stringify(response.data.filter(expense => expense.user === JSON.parse(localStorage.getItem("user")).username)));

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
    // categorySelected
    const [categorySelected, setCategorySelected] = useState("Food");

    // set category function
    const setCategory = (category) => {
        setCategorySelected(category);
    //     open modal_EXPAND_CATEGORY
        document.getElementById("modal_EXPAND_CATEGORY").classList.remove("-translate-y-[96rem]");
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const saveLogData = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        //     close register modal and login modal
        document.getElementById("reg").style.transform = "translateX(100rem)";
        document.getElementById("reg").style.opacity = "0";
        document.getElementById("reg").style.transition = "all 0.5s ease";
        document.getElementById("login").style.transform = "translateX(100rem)";
        document.getElementById("login").style.opacity = "0";
        document.getElementById("login").style.transition = "all 0.5s ease";
        window.location.reload();
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
                    saveLogData(user)
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
                    saveLogData(user);
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
        // eslint-disable-next-line array-callback-return
        expenses.map((expense) => {
            total += parseFloat(expense.amount);
        })
        state.balance = total.toFixed(2);
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
        });

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
                state.expCategories[expense.category] += parseFloat(expense.amount);
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
        console.log(expenses)
        // if expenses is not defined or empty then set budget to 0
        if (expenses === null || expenses.length === 0) {
            state.budget = 0;
            localStorage.setItem("budget", state.budget);
            window.location.reload();
        }
        // get all dates only last week
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 1; i++) {
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
                expensesByDate[expense.date] += parseFloat(expense.amount);
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
        if (categories === null || categories.length === 0) {
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
                notificationsOPCL={opencloseModalNotifications}
                notifications={document.getElementById("modal_notifications")}
            />
            <div id="top" className="overflow-y-hidden pt-24 bg-[#1a1a1a] bg-opacity-0">
                <div id="top"></div>
                <Preloader/>
                {/* Modal window notifications */}
                <NotificationCenter/>
                {/* Modal window register */}
                <RegisterForm
                    handleEmailChange={handleEmailChange}
                    handlePasswordChange={handlePasswordChange}
                    handleUsernameChange={handleUsernameChange}
                    handleSubmit={handleSubmit}
                    username={username}
                    password={password}
                    email={email}
                />
                {/* login modal */}
                <LoginForm
                    handleusernamechange={handleUsernameChange}
                    handlepasswordchange={handlePasswordChange}
                    handlelogin={handleLogin}
                    username={username}
                    password={password}
                />

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
                <div id="top" className=" fixed w-full min-[1300px]:w-3/3 min-[1300px]:m-auto bg-[#1a1a1a] bg-opacity-0 min-[1300px]:static">
                    {/* Expenses and chart */}
                    {/*form chat gpt*/}
                    <div className="min-[1300px]:flex items-stretch justify-center">
                        <ExpensesChart
                            balance={state.balance}
                            budget={state.budget}
                            openmodalbudget={openModalBudget}

                        />
                        <CategoriesChart
                            expenses={expenses}
                        />
                    </div>


                    <ExpandCategories
                        expenses={expenses}
                        category={categorySelected}
                    />
                    {/* Cards with expenses */}

                    <div id="catan"
                        className="min-[1300px]:px-10  relative duration-500 flex items-center min-[1300px]:justify-center overflow-x-scroll min-[1300px]:overflow-x-hidden pb-5 min-[1300px]:flex-wrap m-auto  ">
                        <Categories
                            state={state}
                            modalopen={openModal}
                            setcategory={setCategory}
                        />
                        {/* Add Category button*/}
                    </div>

                </div>
                <AddExpenseBttn
                    openModal={openModal}
                />
                {/* Spendings */}
                <Spendings
                    state={state}
                    expenses={expenses}
                />
            </div>
        </>
    );
}

export default Dashboard;