import {
    useEffect,
    useState
} from "react";





interface TrendItem {


    location:string;


    risk_level:string;


    risk_score:number;


    confidence:number;


    date:string;


}









export default function RiskTrend(){



    const [trend,setTrend] = useState<TrendItem[]>([]);


    const [loading,setLoading] = useState(true);


    const [error,setError] = useState("");









    async function loadTrend(){



        try{


            const token = localStorage.getItem(

                "token"

            );



            const response = await fetch(

                "http://127.0.0.1:8000/risk-trend",

                {


                    headers:{


                        Authorization:

                        `Bearer ${token}`


                    }


                }

            );






            const data = await response.json();





            if(!response.ok){


                throw new Error(

                    data.detail ||

                    "Failed loading trend"

                );


            }





            setTrend(

                data.trend || []

            );



        }


        catch(err:any){


            setError(

                err.message

            );


        }


        finally{


            setLoading(false);


        }


    }









    useEffect(()=>{


        loadTrend();



    },[]);









    function riskStyle(level:string){



        const value = level.toUpperCase();



        if(value==="HIGH"){


            return {


                badge:"bg-red-100 text-red-700",


                bar:"bg-red-500",


                icon:"🔴"


            };


        }





        if(value==="LOW"){


            return {


                badge:"bg-green-100 text-green-700",


                bar:"bg-green-500",


                icon:"🟢"


            };


        }





        return {


            badge:"bg-yellow-100 text-yellow-700",


            bar:"bg-yellow-500",


            icon:"🟡"


        };


    }









    return (


        <div className="bg-white rounded-2xl shadow-sm p-6">






            <div className="mb-6">


                <h2 className="text-xl font-bold">


                    Risk Trend


                </h2>



                <p className="text-gray-500 text-sm">


                    Recent AI environmental risk predictions


                </p>


            </div>









            {loading && (


                <p className="text-gray-500">

                    Loading trend data...

                </p>

            )}








            {error && (


                <p className="text-red-500">

                    {error}

                </p>

            )}









            {!loading && trend.length===0 && (


                <p className="text-gray-500">

                    No prediction history available.

                </p>


            )}









            <div className="space-y-4">





            {

                trend.map(

                    (item,index)=>{


                        const style = riskStyle(

                            item.risk_level

                        );



                        return (



                        <div


                        key={index}


                        className="border rounded-xl p-5 hover:shadow-md transition"


                        >




                            <div className="flex justify-between items-start">





                                <div>


                                    <div className="flex items-center gap-2">


                                        <span>


                                            {style.icon}

                                        </span>



                                        <h3 className="font-bold text-lg">


                                            {item.location}


                                        </h3>


                                    </div>




                                    <p className="text-sm text-gray-500 mt-1">


                                        Prediction recorded


                                    </p>



                                </div>






                                <span


                                className={`px-3 py-1 rounded-full text-sm font-bold ${style.badge}`}


                                >


                                    {item.risk_level}


                                </span>





                            </div>









                            <div className="grid grid-cols-2 gap-4 mt-5">





                                <div>


                                    <p className="text-gray-500 text-sm">


                                        Risk Score


                                    </p>



                                    <p className="text-xl font-bold">


                                        {item.risk_score}/100


                                    </p>



                                </div>






                                <div>


                                    <p className="text-gray-500 text-sm">


                                        AI Confidence


                                    </p>



                                    <p className="text-xl font-bold">


                                        {item.confidence || 0}%


                                    </p>



                                </div>




                            </div>








                            <div className="mt-4">


                                <div className="w-full bg-gray-200 rounded-full h-2">


                                    <div


                                    className={`${style.bar} h-2 rounded-full`}


                                    style={{


                                        width:

                                        `${item.risk_score}%`


                                    }}


                                    >

                                    </div>


                                </div>


                            </div>








                            <div className="mt-4 text-sm text-gray-500">


                                📅


                                {" "}

                                {new Date(

                                    item.date

                                ).toLocaleString()}



                            </div>






                        </div>


                        );


                    }

                )

            }



            </div>







        </div>


    );

}