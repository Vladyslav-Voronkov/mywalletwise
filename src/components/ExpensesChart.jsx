import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import stars from "../img/icons/starsai.svg";
import React from "react";
import {useState} from "react";

const Expenses_chart = ({
    openmodalbudget,
    balance,
    budget,
}) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const [dd, setDd] = useState(null);

    React.useEffect(() => {
        setLoading(true);
        fetch("https://api.freecurrencyapi.com/v1/latest?apikey=FtgQqfrq7w1kxCFHsQ4PHhf9IIOjVz7BPuLSGq8U&currencies=USD&base_currency=zł")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
                const calculatedDd = (data.data.USD * balance).toFixed(2);
                setDd(calculatedDd);
                console.log(dd);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });
    } , []);

    // get time every second
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    setInterval(() => {
        setTime(new Date().toLocaleTimeString());
    } , 1000);
    return (
        <>
            <div onClick={openmodalbudget} id="expchart" className="min-[1300px]:w-1/2 self-stretch mx-5 flex justify-between sm:mx-20 items-center
              bg-gray-800 rounded-3xl shadow-xl p-5 bg-opacity-50 backdrop-blur-md
            ">
                <div>
                    {/*<div className="text-right w-full flex flex-col">*/}
                    {/*    <div className="animate-pulse*/}
                    {/*       text-white flex justify-start items-center text-sm*/}
                    {/*       ">*/}

                    {/*        {time}*/}
                    {/*    </div>*/}
                    {/*    <p className="uppercase text-white text-sm flex items-center justify-between">{*/}
                    {/*        //     month name english only*/}
                    {/*        new Date().toLocaleString('eng', { month: 'long' })*/}
                    {/*        //     date*/}
                    {/*    } {new Date().getDate()}, {new Date().getFullYear()*/}

                    {/*    }*/}

                    {/*    </p>*/}
                    {/*</div>*/}
                    <span className="text-gray-400 flex items-center w-max">Spendings in {
                        //     month name english only
                        new Date().toLocaleString('eng', { month: 'long' })
                    }


                    </span>
                    <h1 className="text-4xl font-bold mt-2 text-white
                    hover:text-gray-400 transition duration-500 ease-in-out cursor-pointer flex items-center
                    leading-none
                    ">{
                        parseFloat(balance).toFixed(2).split(".")[0]
                    }
                    <p className="text-lg mr-2 self-center leading-none text-gray-300">
                        {
                            parseFloat(balance).toFixed(2).split(".")[1]

                        }
                        <p className="text-green-500">zł</p>
                    </p> /
                        <p className={"text-sm ml-2"}>
                            {" " + budget} zł
                        </p>
                    </h1>

                    {/*{*/}
                    {/*    localStorage.getItem("dynamic_budget") === "true" ? (*/}
                    {/*        <div*/}
                    {/*            onClick={openmodalbudget}*/}
                    {/*            className="mt-3 rounded-full border-gray-400 border  w-max p-1 text-white px-5 flex*/}
                    {/*            cursor-pointer*/}
                    {/*            hover:bg-gray-400 hover:bg-opacity-10 backdrop-blur-md transition duration-500 ease-in-out*/}
                    {/*            flex-col*/}
                    {/*            "> {*/}
                    {/*            budget - balance*/}
                    {/*        } zł Left to budget*/}
                    {/*            <div className="flex items-center justify-start">*/}
                    {/*                <img src = {stars} alt = "stars" className = "w-5 h-5 "/>*/}
                    {/*                <p className="*/}
                    {/*            text-xs ml-2 text-gray-400*/}
                    {/*            ">Dynamic Budget Activated</p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    ):(*/}
                    {/*        <div*/}
                    {/*            onClick={openmodalbudget}*/}
                    {/*            className="mt-1  w-max p-1 text-white cursor-pointer*/}
                    {/*          ">{*/}
                    {/*            budget - balance*/}
                    {/*        }zł left*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*}*/}
                </div>

                {/* Pie chart */}
                <div>
                    <CircularProgressbar className="w-24 sm:w-42 text-white " value={
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