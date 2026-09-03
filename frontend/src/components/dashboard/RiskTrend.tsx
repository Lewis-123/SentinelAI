export default function RiskTrend(){


    const trends = [

        {
            month:"January",
            score:45
        },

        {
            month:"February",
            score:65
        },

        {
            month:"March",
            score:85
        }

    ];



    return (

        <div className="bg-white rounded-xl shadow p-6">


            <h2 className="text-xl font-bold mb-4">

                Risk Trend

            </h2>



            {trends.map((item)=>(


                <div

                    key={item.month}

                    className="mb-4"

                >

                    <div className="flex justify-between">

                        <span>

                            {item.month}

                        </span>


                        <span>

                            {item.score}/100

                        </span>


                    </div>



                    <div className="bg-gray-200 h-3 rounded">


                        <div

                            className="bg-red-500 h-3 rounded"

                            style={{

                                width:`${item.score}%`

                            }}

                        />


                    </div>



                </div>


            ))}



        </div>

    );

}