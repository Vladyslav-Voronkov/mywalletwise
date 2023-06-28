// import icons
import home from "../img/icons/home.svg";
import food from "../img/icons/food.svg";
import saving from "../img/icons/saving.svg";
import transport from "../img/icons/transport.svg";
import clothing from "../img/icons/clothing.svg";
import health from "../img/icons/health.svg";
import entertainment from "../img/icons/entertainment.svg";
import other from "../img/icons/other.svg";

import aos from 'aos';
import 'aos/dist/aos.css';



const Icons = (
    { expense }
) => {
    return (
        <div className="flex justify-between items-center">
            {expense.category === "Housing" ? <div className="
            flex justify-center items-center
            rounded-full
            ">
                <img src={home}  width={50} alt="home" />
            </div> : null}
            {expense.category === "Food" ? <div className="
            flex justify-center items-center
            rounded-full">
                <img src={food}  width={50} alt="food" />
            </div> : null}
            {expense.category === "Saving" ? <div className="
            flex justify-center items-center
        rounded-full">
                <img src={saving}  width={50} alt="saving" />
            </div> : null}
            {expense.category === "Transport" ? <div className="
            flex justify-center items-center
            rounded-full ">
                <img src={transport}  width={50} alt="transport" />
            </div> : null}
            {expense.category === "Clothing" ? <div className="
           flex justify-center items-center
            rounded-full ">
                <img src={clothing}  width={50} alt="clothing" />
            </div> : null}
            {expense.category === "Health" ? <div className="
            flex justify-center items-center
            rounded-full ">
                <img src={health} width={50} alt="health" />
            </div> : null}
            {expense.category === "Entertainment" ? <div className="
            flex justify-center items-center
            rounded-full">
                <img src={entertainment} width={50}  alt="entertainment" />
            </div> : null}
            {expense.category === "Other" ? <div className="
            flex justify-center items-center
            rounded-full ">
                <img src={other} width={50} alt="other" />
            </div> : null}
            <div className="ml-3">
                <h1 className="text-white text-lg">{expense.name}</h1>
                <h1 className="text-gray-400 text-sm">{expense.category}</h1>
            </div>
        </div>
    );
}

const Spendings = ({
    state, expenses
}) => {
    aos.init();

    const open = () => {
        if(document.getElementById("spendingss").classList.contains("scale-[0]")){
        document.getElementById("spendingss").classList.remove("blur-sm");
        document.getElementById("spendingss").classList.remove("scale-[0]");
        document.getElementById("expchart").classList.add("duration-700");
        document.getElementById("expchart").classList.add("translate-y-[-15rem]");
        document.getElementById("expchart").classList.add("scale-0");
        document.getElementById("catan").classList.add("duration-700");
        document.getElementById("catan").classList.add("translate-y-[-30rem]");
        document.getElementById("catan").classList.add("scale-0");
        document.getElementById("bar").classList.remove("mb-20");

        document.getElementById("bar").classList.add("mb-56");
        document.getElementById("bar").classList.remove("w-10");
        document.getElementById("bar").classList.add("w-36");
        document.getElementById("bar").classList.remove("h-[15px]");
        document.getElementById("catcharts").classList.add("duration-700");
        document.getElementById("catcharts").classList.add("translate-y-[-30rem]");
        document.getElementById("catcharts").classList.add("scale-0");
        } else {
            document.getElementById("spendingss").classList.add("blur-sm");
            document.getElementById("spendingss").classList.add("scale-[0]");
                document.getElementById("expchart").classList.remove("translate-y-[-15rem]");
                document.getElementById("expchart").classList.remove("scale-0");
                document.getElementById("catan").classList.remove("translate-y-[-30rem]");
                document.getElementById("catan").classList.remove("scale-0");
            document.getElementById("bar").classList.add("mb-20");
            document.getElementById("bar").classList.remove("mb-56");
            document.getElementById("bar").classList.add("w-10");
            document.getElementById("bar").classList.remove("w-36");
            document.getElementById("catcharts").classList.remove("translate-y-[-30rem]");
            document.getElementById("catcharts").classList.remove("scale-0");

        }
    }

    window.addEventListener("scroll", () => {
        if(window.scrollY > 0) {
            document.getElementById("bar").classList.add("h-[15px]");

        } else{
            document.getElementById("bar").classList.remove("h-[15px]");
        }
        if (window.scrollY > 150) {
            document.getElementById("spendingss").classList.remove("blur-sm");
            document.getElementById("spendingss").classList.remove("scale-[0]");
            document.getElementById("expchart").classList.add("duration-700");
            document.getElementById("expchart").classList.add("translate-y-[-15rem]");
            document.getElementById("expchart").classList.add("scale-0");
            document.getElementById("catan").classList.add("duration-700");
            document.getElementById("catan").classList.add("translate-y-[-30rem]");
            document.getElementById("catan").classList.add("scale-0");
            document.getElementById("bar").classList.remove("mb-20");

            document.getElementById("bar").classList.add("mb-56");
            document.getElementById("bar").classList.remove("w-10");
            document.getElementById("bar").classList.add("w-36");
            document.getElementById("bar").classList.remove("h-[15px]");
            document.getElementById("catcharts").classList.add("duration-700");
            document.getElementById("catcharts").classList.add("translate-y-[-30rem]");
            document.getElementById("catcharts").classList.add("scale-0");

        } else if(window.scrollY < 0) {
            document.getElementById("spendingss").classList.add("blur-sm");
            document.getElementById("spendingss").classList.add("scale-[0]");
                document.getElementById("expchart").classList.remove("translate-y-[-15rem]");
                document.getElementById("expchart").classList.remove("scale-0");
                document.getElementById("catan").classList.remove("translate-y-[-30rem]");
                document.getElementById("catan").classList.remove("scale-0");
            document.getElementById("bar").classList.add("mb-20");
            document.getElementById("bar").classList.remove("mb-56");
            document.getElementById("bar").classList.add("w-10");
            document.getElementById("bar").classList.remove("w-36");
            document.getElementById("catcharts").classList.remove("translate-y-[-30rem]");
            document.getElementById("catcharts").classList.remove("scale-0");


        }
        if(window.scrollY < 0){
            window.scrollTo(0, -1);
        }
    } );

    return (
        <>
            <div onClick={open} id="bar" className="
            bg-white w-10 bg-opacity-50 h-[6px] rounded-full absolute left-1/2  transform -translate-x-1/2 bottom-0  mb-20
            duration-500 hover:h-[20px]
            "></div>
            <div id="spendingss" className=" blur-sm min-[1300px]:mt-0 mt-[30rem] transition-all duration-700 pb-32
            w-full  scale-[0] md:w-2/3 m-auto p-5 rounded-2xl bg-gray-800 bg-opacity-0 z-20 absolute overflow-x-hidden overflow-y-hidden">
                <div className=" overflow-y-hidden md:overflow-y-hidden  overflow-x-hidden md:w-2/3 md:m-auto">
                    {/* Today expenses */}
                    <h1 className="text-white text-xl">Today</h1>
                    {/* sort by date "TODAY" */}
                    {
                        //    get today expenses
                        expenses.filter((expense) => {
                            const today = new Date();
                            const date = new Date(expense.date);

                            return date.getDate() === today.getDate();
                        }
                        ).reverse().map((expense) => (
                           <>
                               <div data-aos="zoom-in-up"
                                    id={expense._id}
                                    onClick={
                                        () => {
                                            document.getElementById("notes_" + expense._id).classList.toggle("hidden");
                                            document.getElementById("notes_" + expense._id).classList.toggle("opacity-100");
                                            document.getElementById("notes_" + expense._id).classList.toggle("duration-500");
                                        }
                                    }
                                    className="flex justify-between items-center mt-4 bg-gray-700 bg-opacity-50 backdrop-blur-md p-4 rounded-3xl">
                                   <Icons expense={expense} />
                                   <div>
                                       <h1 id={
                                           "name_" + expense._id
                                       } className="text-white text-xl text-right">- {parseFloat(expense.amount)} PLN</h1>
                                   </div>

                                   <div id={
                                       "delete_" + expense._id
                                   } className="
                                bg-red-500 p-2 ml-2 rounded-2xl text-white opacity-0 w-20 hidden duration-500 flex justify-center items-center
                                ">
                                       <h1>Delete</h1>
                                   </div>
                               </div>
                               <div>
                                   {/*expense notes*/}
                                   {
                                       expense.notes ? (
                                           <div id={
                                               "notes_" + expense._id
                                           } data-aos="zoom-in-up" className="mb-10 hidden bg-gray-700 bg-opacity-50 backdrop-blur-md p-4 rounded-3xl mt-2">
                                               <h1 className="text-white text-xl text-right">Note</h1>
                                               <h1 className="text-gray-400 text-sm text-right">{expense.notes}</h1>
                                           </div>
                                       ) : (
                                           <>
                                               <div id={
                                                   "notes_" + expense._id
                                               } data-aos="zoom-in-up" className="mb-10 hidden bg-gray-700 bg-opacity-50 backdrop-blur-md p-4 rounded-3xl mt-2">
                                                   <h1 className="text-white text-xl text-right">No notes</h1>

                                               </div></>
                                       )
                                   }
                               </div>
                           </>
                        ))
                    }

                    {/* earlier */}
                    <h1 className="text-white text-xl mt-10">Earlier</h1>
                    {/* sort by date "EARLIER" */}
                    {
                        expenses.filter((expense) => {
                            const today = new Date();
                            const date = new Date(expense.date);
                            return date.getDate() < today.getDate();
                        }
                        ).map((expense) => (
                          <>
                              <div
                                  onClick={
                                      () => {
                                          document.getElementById("notes_" + expense._id).classList.toggle("hidden");
                                          document.getElementById("notes_" + expense._id).classList.toggle("opacity-100");
                                          document.getElementById("notes_" + expense._id).classList.toggle("duration-500");
                                      }
                                  }
                                  data-aos="zoom-in-up" className="flex justify-between items-center mt-4 bg-gray-700 bg-opacity-50 backdrop-blur-md p-4 rounded-3xl">
                                  <Icons expense={expense} />
                                  <div id={
                                      "name_" + expense._id
                                  }>
                                      <h1 className="text-white text-xl text-right">- {parseFloat(expense.amount)} PLN</h1>
                                      <h1 className="text-gray-400 text-sm text-right">{
                                          //     date of expense
                                          new Date(expense.date).getDate() + "." +
                                          new Date(expense.date).getMonth() + "." +
                                          new Date(expense.date).getFullYear()
                                      }</h1>
                                  </div>
                                  <div id={
                                      "delete_" + expense._id
                                  } className="
                                bg-red-500 p-2 ml-2 rounded-2xl text-white opacity-0 w-20 hidden duration-500 flex justify-center items-center
                                ">
                                      <h1>Delete</h1>
                                  </div>

                              </div>
                            <div>
                                {/*expense notes*/}
                                {
                                    expense.notes ? (
                                        <div id={
                                            "notes_" + expense._id
                                        } data-aos="zoom-in-up" className="mb-10 hidden bg-gray-700 bg-opacity-50 backdrop-blur-md p-4 rounded-3xl mt-2">
                                            <h1 className="text-white text-xl text-right">Note</h1>
                                            <h1 className="text-gray-400 text-sm text-right">{expense.notes}</h1>
                                        </div>
                                    ) : (
                                        <>
                                            <div id={
                                                "notes_" + expense._id
                                            } data-aos="zoom-in-up" className="mb-10 hidden bg-gray-700 bg-opacity-50 backdrop-blur-md p-4 rounded-3xl mt-2">
                                                <h1 className="text-white text-xl text-right">No notes</h1>

                                            </div></>
                                    )
                                }
                            </div>
                          </>
                        ))
                    }

                </div>

            </div>
        </>
    );
}

export default Spendings;