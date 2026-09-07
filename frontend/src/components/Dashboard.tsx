import {
    useEffect,
    useState
} from "react";



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









    return (



        <div className="space-y-8">







            {/* System Overview */}



            <section className="bg-white rounded-2xl shadow-sm p-6">



                <div className="flex justify-between items-center">





                    <div>


                        <h1 className="text-3xl font-bold text-gray-800">


                            SentinelAI Operations Dashboard


                        </h1>




                        <p className="text-gray-500 mt-2">


                            AI-powered environmental risk monitoring

                            and early warning system


                        </p>



                    </div>








                    <div className="hidden md:block">



                        <span className="font-semibold">


                            System:


                        </span>



                        <span className="ml-2 text-green-600 font-bold">


                            🟢 {status}


                        </span>



                    </div>





                </div>



            </section>









            {/* Intelligence Cards */}



            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">



                <AlertPanel />



                <RiskSummary />



                <RiskTrend />



            </section>









            {/* Highest Risk Locations */}



            <section className="bg-white rounded-2xl shadow-sm p-6">





                <div className="mb-5">


                    <h2 className="text-2xl font-bold">


                        Highest Risk Locations


                    </h2>




                    <p className="text-gray-500">


                        Areas requiring closest monitoring


                    </p>



                </div>









                {

                locations.length===0 && (


                    <p className="text-gray-500">


                        No location risk data available.


                    </p>


                )

                }









                <div className="space-y-3">



                {


                locations.map(

                    (item,index)=>(



                        <div


                        key={index}


                        className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50"


                        >




                            <div className="font-semibold">


                                #{index+1}

                                {" "}

                                {item.location}


                            </div>







                            <div className="text-right">



                                <div className="font-bold">


                                    {item.risk_level}


                                </div>



                                <div className="text-gray-500">


                                    {item.risk_score}/100


                                </div>



                            </div>





                        </div>



                    )

                )


                }



                </div>





            </section>









            {/* Prediction History */}



            <section className="bg-white rounded-2xl shadow-sm p-6">


                <RiskHistory />


            </section>









            {/* AI Analyzer */}



            <section className="bg-white rounded-2xl shadow-sm p-6">


                <LocationAnalyzer />


            </section>









            {/* GIS Map */}



            <section className="bg-white rounded-2xl shadow-sm p-6">


                <RiskMap />


            </section>







        </div>



    );

}