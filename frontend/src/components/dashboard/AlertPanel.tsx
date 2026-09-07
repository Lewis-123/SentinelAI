import {
    useEffect,
    useState
} from "react";


import {
    API_URL
} from "../../config";








interface Alert {


    location:string;


    previous_risk?:string;


    current_risk:string;


    risk_score:number;


    message:string;


    created_at:string;


}









export default function AlertPanel(){



    const [alerts,setAlerts] = useState<Alert[]>([]);



    const [loading,setLoading] = useState(true);



    const [error,setError] = useState("");









    async function loadAlerts(){



        try{



            const token = localStorage.getItem(

                "token"

            );






            const response = await fetch(



                `${API_URL}/alerts`,



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


                    "Failed loading alerts"


                );



            }








            setAlerts(


                data.alerts || []


            );






        }



        catch(error:any){



            console.error(


                "Alert loading failed",


                error


            );



            setError(


                error.message


            );



        }



        finally{



            setLoading(false);



        }



    }









    useEffect(()=>{



        loadAlerts();





        const interval = setInterval(



            loadAlerts,



            60000



        );





        return ()=>clearInterval(interval);




    },[]);









    function severityColor(



        risk:string



    ){





        const value = risk?.toUpperCase();







        if(value==="HIGH"){



            return {


                border:

                "border-red-500",


                background:

                "bg-red-50",


                icon:

                "🔴"


            };


        }









        if(value==="MEDIUM"){



            return {


                border:

                "border-yellow-500",


                background:

                "bg-yellow-50",


                icon:

                "🟡"


            };


        }








        return {


            border:

            "border-green-500",


            background:

            "bg-green-50",


            icon:

            "🟢"


        };



    }














    return (



        <div className="bg-white rounded-2xl shadow-sm p-6">








            <div className="flex justify-between items-center mb-5">



                <div>



                    <h2 className="text-xl font-bold text-gray-800">


                        Active Alerts


                    </h2>





                    <p className="text-sm text-gray-500">


                        Real-time environmental risk notifications


                    </p>



                </div>





                <span className="text-sm text-gray-400">


                    Live


                </span>



            </div>









            {loading && (



                <p className="text-gray-500">


                    Loading alerts...


                </p>



            )}









            {error && (



                <p className="text-red-500">


                    {error}


                </p>



            )}









            {!loading && alerts.length===0 && (



                <p className="text-gray-500">


                    No active alerts.


                </p>



            )}












            <div className="space-y-4">







            {


            alerts.map(



                (alert,index)=>{





                    const style = severityColor(


                        alert.current_risk


                    );








                    return (






                    <div



                        key={index}



                        className={

                            `border-l-4 rounded-xl p-5 ${

                                style.border

                            } ${

                                style.background

                            }`

                        }



                    >








                        <div className="flex justify-between items-start">







                            <h3 className="font-bold text-lg">


                                {style.icon}


                                {" "}


                                {alert.location}



                            </h3>







                            <span className="font-bold">


                                {alert.risk_score}/100


                            </span>





                        </div>









                        <p className="mt-3 text-sm">



                            Risk transition:



                            {" "}





                            <strong>


                                {alert.previous_risk || "Unknown"}


                            </strong>





                            {" → "}





                            <strong>


                                {alert.current_risk}


                            </strong>





                        </p>









                        <p className="mt-2 text-gray-700">


                            {alert.message}


                        </p>









                        <small className="text-gray-500 block mt-3">


                            Detected:


                            {" "}



                            {


                            alert.created_at



                            ?



                            new Date(


                                alert.created_at


                            ).toLocaleString()



                            :



                            "N/A"



                            }



                        </small>









                    </div>







                    );



                }



            )



            }








            </div>








        </div>



    );


}