import { useEffect, useState } from "react";



interface Alert {


    location:string;

    previous_risk:string;

    current_risk:string;

    risk_score:number;

    message:string;

    created_at:string;


}







export default function AlertPanel(){



    const [alerts,setAlerts] = useState<Alert[]>([]);



    const [loading,setLoading] = useState(true);








    async function loadAlerts(){



        try{


            const token = localStorage.getItem(

                "token"

            );



            const response = await fetch(

                "http://127.0.0.1:8000/alerts",

                {


                    headers:{


                        Authorization:

                        `Bearer ${token}`


                    }


                }

            );





            const data = await response.json();





            setAlerts(

                data.alerts || []

            );



        }


        catch(error){


            console.log(

                "Alert loading failed",

                error

            );


        }


        finally{


            setLoading(false);


        }


    }








    useEffect(()=>{


        loadAlerts();



    },[]);









    function severityColor(

        risk:string

    ){



        if(risk==="HIGH"){


            return "border-red-500 bg-red-50";


        }



        if(risk==="MEDIUM"){


            return "border-yellow-500 bg-yellow-50";


        }



        return "border-green-500 bg-green-50";


    }










    return (



        <div className="bg-white rounded-xl shadow p-6">



            <h2 className="text-xl font-bold mb-4">


                Active Alerts


            </h2>







            {

                loading && (


                    <p>

                        Loading alerts...

                    </p>


                )

            }







            {

                !loading && alerts.length===0 && (


                    <p className="text-gray-500">


                        No active alerts.


                    </p>


                )

            }









            <div className="space-y-4">



            {

                alerts.map(

                    (alert,index)=>(


                        <div


                            key={index}


                            className={

                                `border rounded-lg p-4 ${

                                    severityColor(

                                        alert.current_risk

                                    )

                                }`

                            }


                        >



                            <div className="flex justify-between">


                                <h3 className="font-bold text-lg">


                                    ⚠ {alert.location}


                                </h3>



                                <span className="font-bold">


                                    {alert.risk_score}/100


                                </span>


                            </div>








                            <p className="mt-2">


                                Risk changed:


                                {" "}


                                <strong>


                                    {alert.previous_risk}


                                </strong>


                                {" → "}


                                <strong>


                                    {alert.current_risk}


                                </strong>


                            </p>







                            <p>


                                {alert.message}


                            </p>








                            <small className="text-gray-600">


                                Detected:


                                {" "}


                                {new Date(

                                    alert.created_at

                                ).toLocaleString()}


                            </small>





                        </div>


                    )

                )

            }



            </div>





        </div>


    );


}