export default function RiskTrend(){


    const months = [

        {
            month:"Jan",
            score:45
        },

        {
            month:"Feb",
            score:60
        },

        {
            month:"Mar",
            score:80
        }

    ];



    return (

        <div className="bg-white rounded-xl shadow p-6">


            <h2 className="text-xl font-bold mb-4">

                Risk Trend

            </h2>



            {

            months.map(item=>(


                <div

                    key={item.month}

                    className="mb-3"

                >

                    <div>

                        {item.month}

                    </div>


                    <div

                    className="bg-gray-200 rounded h-4"

                    >

                        <div

                        className="bg-red-500 h-4 rounded"

                        style={{

                            width:`${item.score}%`

                        }}

                        >

                        </div>


                    </div>



                </div>


            ))

            }



        </div>

    );

}