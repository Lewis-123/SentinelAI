import { useEffect, useState } from "react";
import axios from "axios";


interface Alert {

    location:string;

    risk_level:string;

    severity:string;

    message:string;

    timestamp:string;

}



function Alerts(){


    const [alerts,setAlerts] =
        useState<Alert[]>([]);



    const fetchAlerts = async()=>{


        try{


            const response =
                await axios.get(
                    "http://127.0.0.1:8000/alerts"
                );


            setAlerts(
                response.data.alerts
            );


        }

        catch(error){

            console.error(
                "Failed to load alerts",
                error
            );

        }


    };



    useEffect(()=>{


        fetchAlerts();


    },[]);




    return (

        <div className="bg-white rounded-xl shadow p-6 mt-10">


            <h2 className="text-2xl font-bold mb-5">

                🚨 Active Alerts

            </h2>




            {
                alerts.length === 0 && (

                    <p className="text-gray-500">

                        No active alerts

                    </p>

                )
            }




            {
                alerts.map(

                    (alert,index)=>(


                    <div

                    key={index}

                    className="border rounded-lg p-4 mb-4"

                    >


                        <div className="flex justify-between">


                            <h3 className="font-bold text-red-600">

                                {alert.severity}

                            </h3>


                            <span>

                                {alert.timestamp}

                            </span>


                        </div>



                        <p className="mt-2">

                            Risk Level:

                            {" "}

                            <strong>

                            {alert.risk_level}

                            </strong>

                        </p>



                        <p className="mt-2">

                            {alert.message}

                        </p>



                        <p className="mt-2 text-gray-600">

                            Location:

                            {" "}

                            {alert.location}

                        </p>



                    </div>


                    )

                )
            }



        </div>

    )

}



export default Alerts;