import {
    useEffect,
    useState
} from "react";


import {
    API_URL
} from "../../config";








interface HistoryItem {


    location:string;


    risk_level:string;


    risk_score:number;


    confidence?:number;


    created_at:string;


}









export default function RiskHistory(){



    const [history,setHistory] = useState<HistoryItem[]>([]);


    const [loading,setLoading] = useState(true);


    const [error,setError] = useState("");









    async function loadHistory(){



        try{



            const token = localStorage.getItem(

                "token"

            );





            const response = await fetch(



                `${API_URL}/history/`,



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


                    "Failed to load history"


                );


            }







            setHistory(


                data.history || []


            );





        }


        catch(error:any){



            setError(


                error.message


            );



        }



        finally{



            setLoading(false);



        }



    }









    useEffect(()=>{


        loadHistory();



    },[]);









    function riskBadge(level:string){



        const value = level.toUpperCase();







        if(value==="HIGH"){


            return "bg-red-100 text-red-700";


        }







        if(value==="LOW"){


            return "bg-green-100 text-green-700";


        }








        return "bg-yellow-100 text-yellow-700";


    }













    return (



        <div className="bg-white rounded-2xl shadow-sm p-6">







            <div className="flex justify-between items-center mb-6">



                <div>



                    <h2 className="text-xl font-bold text-gray-800">


                        Prediction History


                    </h2>




                    <p className="text-sm text-gray-500">


                        Complete AI environmental risk prediction records


                    </p>



                </div>



            </div>












            {loading && (



                <p className="text-gray-500">


                    Loading history...


                </p>



            )}









            {error && (



                <p className="text-red-500">


                    {error}


                </p>



            )}









            {!loading && history.length===0 && (



                <p className="text-gray-500">


                    No prediction history available.


                </p>



            )}









            {


            history.length > 0 && (





            <div className="overflow-x-auto">





            <table className="w-full text-left">








                <thead>



                    <tr className="border-b bg-gray-50">



                        <th className="p-4">

                            #

                        </th>




                        <th className="p-4">

                            Location

                        </th>




                        <th className="p-4">

                            Risk Level

                        </th>




                        <th className="p-4">

                            Score

                        </th>




                        <th className="p-4">

                            Confidence

                        </th>




                        <th className="p-4">

                            Date

                        </th>



                    </tr>



                </thead>









                <tbody>





                {



                history.slice(0,10).map(



                    (item,index)=>(





                    <tr



                    key={index}



                    className="border-b hover:bg-gray-50 transition"




                    >







                        <td className="p-4 font-semibold">



                            {index+1}



                        </td>









                        <td className="p-4">



                            <div className="font-bold">



                                {item.location}



                            </div>




                            <div className="text-xs text-gray-500">



                                Environmental prediction



                            </div>



                        </td>









                        <td className="p-4">



                            <span




                            className={`px-3 py-1 rounded-full text-sm font-bold ${riskBadge(item.risk_level)}`}




                            >



                                {item.risk_level}



                            </span>



                        </td>









                        <td className="p-4">



                            <div className="font-bold">



                                {item.risk_score}/100



                            </div>







                            <div className="w-28 bg-gray-200 rounded-full h-2 mt-2">



                                <div



                                className="bg-blue-500 h-2 rounded-full"



                                style={{



                                    width:

                                    `${item.risk_score}%`



                                }}



                                >

                                </div>



                            </div>





                        </td>









                        <td className="p-4 font-semibold">



                            {item.confidence ?? 0}%



                        </td>









                        <td className="p-4 text-sm text-gray-500">





                            {



                            item.created_at



                            ?



                            new Date(



                                item.created_at



                            ).toLocaleString()



                            :



                            "N/A"



                            }





                        </td>








                    </tr>




                    )



                )



                }





                </tbody>







            </table>





            </div>





            )



            }







        </div>



    );

}