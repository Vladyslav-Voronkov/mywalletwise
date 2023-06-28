import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale  } from "chart.js";
import { Doughnut } from "react-chartjs-2";
const CategoriesChart = ({ expenses }) => {
    // Получи инфу с expenses и раздели ее на категории
    // (по категориям суммируй суммы)
    // Потом передай в ChartJS
    const categories = expenses.map(expense => expense.category);
    const categoriesSet = new Set(categories);
    const categoriesArray = Array.from(categoriesSet);
    const categoriesSum = categoriesArray.map(category => {
        let sum = 0;
        expenses.forEach(expense => {
            if (expense.category === category) {
                sum += expense.amount;
            }
        });
        return sum;
    }
    );
    ChartJS.register(ArcElement, Tooltip, Legend, LinearScale);
    const data = {
        labels: categoriesArray,
        datasets: [
            {
                label: "Categories",
                data: categoriesSum,
                backgroundColor: [
            //         GRADIENT
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 205, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
            ],
            },
        ],
    };
    return (
        <>
            <div id="catcharts" className="flex justify-center items-center
             min-[1300px]:mr-14
             mx-5 min-[1300px]:w-1/2
            bg-gray-800 rounded-3xl shadow-xl py-5 bg-opacity-50 backdrop-blur-md mt-5 min-[1300px]:mt-0
            ">
                <div>
                    {expenses.length > 0 ? (
                        <Doughnut data={data}
                                  options={{
                                      responsive: true,
                                      maintainAspectRatio: false,
                                      cutout: 50,
                                      elements: {
                                          arc: {
                                              borderWidth: 0,

                                          },
                                      },
                                      plugins: {

                                          legend: {
                                              // show legend on the right
                                              position: 'left',
                                              labels: {
                                                  font: {
                                                      size: 15,

                                                  },
                                                  //     color white
                                                  color: 'white',

                                              }
                                          },
                                      }
                                  }}
                        /> ) : (
                        <div className="text-white text-center">
                            <h1 className="text-2xl font-bold">No expenses yet</h1>
                            <p className="text-lg">Add your first expense to see the chart</p>
                        </div>
                            ) }
                </div>
            </div>

        </>
    );
}

export default CategoriesChart;