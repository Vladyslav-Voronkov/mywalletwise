import x from "../img/icons/x.svg";
import home from "../img/icons/home.svg";
import food from "../img/icons/food.svg";
import saving from "../img/icons/saving.svg";
import tansport from "../img/icons/transport.svg";
import clothing from "../img/icons/clothing.svg";
import health from "../img/icons/health.svg";
import entertainment from "../img/icons/entertainment.svg";
import other from "../img/icons/other.svg";
import React from "react";

const AddExpenseBttn = ({
    openModal
                        }) => {
    return (
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
    );
}

export default AddExpenseBttn;