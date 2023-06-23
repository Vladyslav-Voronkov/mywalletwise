import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import stars from "../img/icons/starsai.svg";

import React from "react";

import axios, {Axios} from "axios";
import { ReactDOM } from "react";

const Expenses_chart = ({
    openmodalbudget,
    balance,
    budget,
}) => {

    return (
        <>

            <div className="mx-5 flex justify-between sm:mx-20 items-center">
                <div>
                    <span className="text-gray-400">Planned Expenses

                    </span>
                    <h1 className="text-4xl font-bold mt-3 text-white
                    hover:text-gray-400 transition duration-500 ease-in-out cursor-pointer
                    ">{balance} PLN</h1>
                    {
                        localStorage.getItem("dynamic_budget") === "true" ? (
                            <div
                                onClick={openmodalbudget}
                                className="mt-3 rounded-full border-gray-400 border  w-max p-1 text-white px-5 flex
                                cursor-pointer
                                hover:bg-gray-400 hover:bg-opacity-10 backdrop-blur-md transition duration-500 ease-in-out
                                flex-col
                                "> {
                                budget - balance
                            } PLN Left to budget
                                <div className="flex items-center justify-start">
                                    <img src = {stars} alt = "stars" className = "w-5 h-5 "/>
                                    <p className="
                                text-xs ml-2 text-gray-400
                                ">Dynamic Budget Activated</p>
                                </div>
                            </div>
                        ):(
                            <div
                                onClick={openmodalbudget}
                                className="mt-3 rounded-full border-gray-400 border  w-max p-1 text-white px-2 cursor-pointer
                                hover:bg-gray-400 hover:bg-opacity-10 backdrop-blur-md transition duration-500 ease-in-out">{
                                budget - balance
                            } PLN Left to budget
                            </div>
                        )
                    }
                </div>

                {/* Pie chart */}
                <div>
                    <CircularProgressbar className="w-32 sm:w-42 text-white" value={
                        balance / budget * 100 > 100 ? 100 : balance / budget * 100
                    } text={`${balance / budget * 100 > 100 ? 100 : (balance / budget * 100).toFixed()
                        }%`}
                        styles={{
                            root: {},
                            path: {
                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                transformOrigin: 'center center',
                                stroke: balance / budget * 100 > 70 ? '#ff0000' : '#4976CD',
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
            </div></>
    )
};

export default Expenses_chart;