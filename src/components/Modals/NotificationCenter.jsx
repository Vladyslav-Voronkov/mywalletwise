import bell from "../../img/icons/bell.svg";
import React from "react";

const NotificationCenter = () => {
    return(
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
    );
}

export default NotificationCenter;