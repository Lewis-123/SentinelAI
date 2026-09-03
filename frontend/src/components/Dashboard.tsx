import LocationAnalyzer from "./LocationAnalyzer";

import RiskMap from "./RiskMap";

import { useEffect, useState } from "react";





interface RiskSummary {


    location: string;

    risk_level: string;

    risk_score: number;

}





export default function Dashboard() {


    const [status, setStatus] = useState(

        "Connecting..."

    );


    const [summary, setSummary] = useState<RiskSummary[]>([]);





    useEffect(() => {


        async function checkSystem() {


            try {


                const response = await fetch(

                    "http://127.0.0.1:8000/health"

                );


                if (response.ok) {


                    setStatus(

                        "SentinelAI Operational"

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

                <div className="bg-white rounded-xl shadow p-6">


                    <h1 className="text-3xl font-bold">

                        SentinelAI Dashboard

                    </h1>


                    <p className="mt-2 text-gray-600">

                        AI-powered environmental risk early warning system

                    </p>



                    <div className="mt-4">


                        <span className="font-semibold">

                            System Status:

                        </span>


                        <span className="ml-2 text-green-600">

                            {status}

                        </span>


                    </div>



                </div>







                {/* Risk Analyzer */}


                <div className="bg-white rounded-xl shadow p-6">


                    <LocationAnalyzer />


                </div>








                {/* GIS Map */}


                <div className="bg-white rounded-xl shadow p-6">


                    <RiskMap />


                </div>







                {/* Risk Summary */}

                <div className="bg-white rounded-xl shadow p-6">


                    <h2 className="text-xl font-bold mb-4">

                        Risk Monitoring Summary

                    </h2>



                    {summary.length === 0 ? (


                        <p className="text-gray-500">

                            No monitored locations available yet.

                        </p>


                    ) : (


                        <div className="grid md:grid-cols-3 gap-4">


                            {summary.map((item)=>(


                                <div

                                    key={item.location}

                                    className="border rounded-lg p-4"

                                >


                                    <h3 className="font-bold">

                                        {item.location}

                                    </h3>



                                    <p>

                                        Risk:

                                        {" "}

                                        {item.risk_level}

                                    </p>



                                    <p>

                                        Score:

                                        {" "}

                                        {item.risk_score}/100

                                    </p>



                                </div>


                            ))}



                        </div>


                    )}



                </div>





            </div>


        </div>


    );

}