import { useEffect, useState } from "react";


import LocationAnalyzer from "./LocationAnalyzer";

import RiskMap from "./RiskMap";


import AlertPanel from "./dashboard/AlertPanel";

import RiskSummary from "./dashboard/RiskSummary";

import RiskTrend from "./dashboard/RiskTrend";

import RiskHistory from "./dashboard/RiskHistory";





interface LocationRisk {

    location:string;

    risk_level:string;

    risk_score:number;

}






export default function Dashboard(){



    const [status,setStatus] = useState(

        "Checking system..."

    );



    const [locations,setLocations] = useState<LocationRisk[]>([]);








    useEffect(()=>{



        async function checkSystem(){



            try{


                const response = await fetch(

                    "http://127.0.0.1:8000/health"

                );



                if(response.ok){


                    setStatus(

                        "SentinelAI Operational"

                    );


                }

                else{


                    setStatus(

                        "Backend Error"

                    );


                }



            }

            catch{


                setStatus(

                    "Backend Offline"

                );

            }


        }






        async function loadLocations(){



            try{



                const token = localStorage.getItem(

                    "token"

                );



                const response = await fetch(

                    "http://127.0.0.1:8000/risk-map",

                    {

                        headers:{


                            Authorization:

                            `Bearer ${token}`


                        }

                    }

                );





                const data = await response.json();





                if(data.locations){



                    const sorted = data.locations.sort(

                        (

                            a:LocationRisk,

                            b:LocationRisk

                        ) =>


                            b.risk_score -

                            a.risk_score

                    );



                    setLocations(

                        sorted.slice(0,5)

                    );


                }



            }

            catch(error){



                console.log(

                    "Risk location loading failed",

                    error

                );


            }



        }







        checkSystem();

        loadLocations();



    },[]);









    function riskColor(level:string){



        if(level==="HIGH"){


            return "text-red-600";


        }



        if(level==="MEDIUM"){


            return "text-yellow-600";


        }




        return "text-green-600";


    }









    return (



        <div className="min-h-screen bg-gray-100 p-6">





            <div className="max-w-7xl mx-auto space-y-8">







                {/* Header */}


                <section className="bg-white rounded-xl shadow p-6">



                    <h1 className="text-3xl font-bold">


                        SentinelAI Operations Dashboard


                    </h1>





                    <p className="text-gray-600 mt-2">


                        AI-powered environmental risk

                        monitoring and early warning system


                    </p>






                    <div className="mt-4">


                        <span className="font-semibold">


                            System Status:


                        </span>




                        <span className="ml-2 text-green-600 font-bold">


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









                {/* Highest Risk Locations */}


                <section className="bg-white rounded-xl shadow p-6">



                    <h2 className="text-2xl font-bold mb-4">


                        Highest Risk Locations


                    </h2>







                    {

                        locations.length===0 && (


                            <p>

                                No location risk data available.

                            </p>


                        )

                    }







                    <div className="space-y-4">



                    {

                        locations.map(

                            (item,index)=>(


                                <div

                                    key={index}

                                    className="flex justify-between items-center border-b pb-3"

                                >



                                    <div>


                                        <span className="font-semibold">


                                            {index+1}. {item.location}


                                        </span>



                                    </div>






                                    <div className="text-right">



                                        <div

                                            className={

                                                `font-bold ${

                                                    riskColor(

                                                        item.risk_level

                                                    )

                                                }`

                                            }

                                        >


                                            {item.risk_level}


                                        </div>




                                        <div>


                                            {item.risk_score}/100


                                        </div>



                                    </div>




                                </div>


                            )

                        )

                    }



                    </div>




                </section>









                {/* Historical Analytics */}


                <section className="bg-white rounded-xl shadow p-6">



                    <RiskHistory />


                </section>









                {/* Location Analysis */}


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