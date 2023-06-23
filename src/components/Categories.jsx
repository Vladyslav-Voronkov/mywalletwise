import React from "react";
import { ReactDOM } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// import icons
import home from "../img/icons/home.svg";
import food from "../img/icons/food.svg";
import saving from "../img/icons/saving.svg";
import transport from "../img/icons/transport.svg";
import clothing from "../img/icons/clothing.svg";
import health from "../img/icons/health.svg";
import entertainment from "../img/icons/entertainment.svg";
import other from "../img/icons/other.svg";


const Categories = (
    { state, modalopen }
) => {
    return (
        <>
            {
                Object.keys(state.expCategories).map((key) => (
                    <>
                        <div className="mt-5 w-3/5 sm:w-1/6 self-stretch shrink-0 text-white text-center">
                            <div onClick={
                                () => {
                                    modalopen(key);
                                }
                            }  className="shrink-0 bg-gradient-to-b bg-black  bg-opacity-30 backdrop-blur-md card drop-shadow-xl p-5 text-white rounded-3xl text-center hover:bg-opacity-50 duration-300 cursor-pointer ml-5">
                                <div className="flex flex-col justify-between items-center ">
                                    <h1 className=" text-4xl font-bold">{state.expCategories[key]} PLN</h1>
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
                                                stroke: state.expCategories[key] / state.balance * 100 > 70 ? '#ff0000' : '#4976CD',
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
                                <h1 className="text-lg font-bold">
                                    {key === "Housing" ? (
                                        <div className="flex items-center justify-center">
                                            <img src={home} className="w-6 inline-block mr-2" />
                                            <p>Housing</p>
                                        </div>
                                    ) : ""}
                                    {key === "Food" ? (
                                        <div className="flex items-center justify-center">
                                            <img src={food} className="w-6 inline-block mr-2" />
                                            <p>Food</p>
                                        </div>
                                    ) : ""}
                                    {key === "Saving" ? (
                                        <div className="flex items-center justify-center">
                                            <img src={saving} className="w-6 inline-block mr-2" />
                                            <p>Saving</p>
                                        </div>
                                    ) : ""}
                                    {key === "Transport" ? (
                                        <div className="flex items-center justify-center">
                                            <img src={transport} className="w-6 inline-block mr-2" />
                                            <p>Transport</p>
                                        </div>
                                    ) : ""}
                                    {key === "Clothing" ? (
                                        <div className="flex items-center justify-center">
                                            <img src={clothing} className="w-6 inline-block mr-2" />
                                            <p>Clothing</p>
                                        </div>
                                    ) : ""}
                                    {key === "Health" ? (
                                        <div className="flex items-center justify-center">
                                            <img src={health} className="w-6 inline-block mr-2" />
                                            <p>Health</p>
                                        </div>
                                    ) : ""}
                                    {key === "Entertainment" ? (
                                        <div className="flex items-center justify-center">
                                            <img src={entertainment} className="w-6 inline-block mr-2" />
                                            <p>Entertainment</p>
                                        </div>
                                    ) : ""}
                                    {key === "Other" ? (
                                        <div className="flex items-center justify-center">
                                            <img src={other} className="w-6 inline-block mr-2" />
                                            <p>Other</p>
                                        </div>
                                    ) : ""}
                                </h1>
                            </div>
                        </div>
                    </>

                ))

            }</>
    );
};

export default Categories;