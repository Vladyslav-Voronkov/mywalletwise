import x from "../img/icons/x.svg";

const ExpandCategories = ({expenses, category = "Food"}) => {
    // get all expenses with food category
    const filteredExpenses = expenses.filter(expense => expense.category === category);
    return (
        <>
            <div id={
                "modal_EXPAND_CATEGORY"
            }
                className="
                fixed top-0 left-0 w-full h-full z-[999]
                flex justify-center items-center -translate-y-[96rem] duration-500
                ">
                <div className="
                bg-[#111] bg-opacity-80 rounded-2xl w-full mx-2
                text-white overflow-y-scroll max-h-96
                ">
                    <div className="
                     mb-2
                    sticky top-0 w-3/3 bg-black p-2 text-center
                    flex justify-between items-center px-5 ">
                        <h1 className="text-2xl
                    ">{category}</h1>
                    {/*close */}
                    <div className="flex items-center" onClick={
                        () => {
                            document.getElementById("modal_EXPAND_CATEGORY").classList.add("-translate-y-[96rem]");
                        }
                    }>
                        <img src={x} alt="close" className="w-10 h-10 cursor-pointer" />
                    </div>
                    </div>
                    {
                    //     map food expenses
                        filteredExpenses.reverse().map(expense => {
                            return (
                                <div className="my-2 mx-5 border-b py-2">
                                    <div className="flex justify-between items-center">

                                        <div>
                                            <h1 className="text-lg">{expense.name}</h1>
                                            {/*    notes */}
                                            <h1 className="text-sm">{expense.notes}</h1>
                                        </div>
                                       <div className="text-right">
                                           <h1 className="text-lg">{expense.amount} PLN</h1>
                                           {/*    date*/}
                                           <h1 className="text-sm">{
                                               new Date(expense.date).toLocaleDateString("en-US", {
                                                   weekday: "long",
                                                   year: "numeric",
                                                   month: "long",
                                                   day: "numeric"
                                               })
                                           }</h1>
                                       </div>

                                    </div>

                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default ExpandCategories;