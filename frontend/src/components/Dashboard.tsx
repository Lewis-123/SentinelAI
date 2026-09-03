import { useEffect, useState } from "react";


import LocationAnalyzer from "./LocationAnalyzer";

import RiskMap from "./RiskMap";


import AlertPanel from "./dashboard/AlertPanel";

import RiskSummary from "./dashboard/RiskSummary";

import RiskTrend from "./dashboard/RiskTrend";





export default function Dashboard() {


    const [status, setStatus] = useState(

        "Checking system..."

    );





    useEffect(() => {


        async function checkSystem(){


            try {


                const response = await fetch(

                    "http://127.0.0.1:8000/health"

                );



                if(response.ok){


                    setStatus(

                        "SentinelAI Operational"

                    );


                }

                else {


                    setStatus(

                        "System Error"

                    );


                }



            } catch {


                setStatus(

                    "Backend Offline"

                );


            }


        }



        checkSystem();



    }, []);






    return (

        <div className="min-h-screen bg-gray-100 p-6">


            <div className="max-w-7xl mx-auto space-y-8">





                {/* Header */}

                <section className="bg-white rounded-xl shadow p-6">


                    <h1 className="text-3xl font-bold">

                        SentinelAI Operations Dashboard

                    </h1>



                    <p className="text-gray-600 mt-2">

                        AI-powered environmental risk monitoring and

                        early-warning platform

                    </p>




                    <div className="mt-4 flex items-center gap-2">


                        <span className="font-semibold">

                            System Status:

                        </span>



                        <span className="text-green-600 font-bold">

                            🟢 {status}

                        </span>


                    </div>



                </section>









                {/* Intelligence Widgets */}

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                    <AlertPanel />


                    <RiskSummary />


                    <RiskTrend />


                </section>









                {/* Risk Analyzer */}

                <section className="bg-white rounded-xl shadow p-6">


                    <LocationAnalyzer />


                </section>









                {/* GIS Map */}

                <section className="bg-white rounded-xl shadow p-6">


                    <RiskMap />


                </section>






            </div>


        </div>

    );

}