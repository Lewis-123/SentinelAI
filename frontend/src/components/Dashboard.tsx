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


import {
    API_URL
} from "../config";









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


    const [loading,setLoading] = useState(true);









    useEffect(()=>{





        async function checkSystem(){



            try{



                const response = await fetch(

                    `${API_URL}/health`

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


                    `${API_URL}/risk-map`,


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

                        "Failed loading risk locations"

                    );


                }








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



                console.error(

                    "Risk location loading failed",

                    error

                );



            }



            finally{


                setLoading(false);


            }



        }








        checkSystem();


        loadLocations();





        const refresh = setInterval(()=>{


            loadLocations();


        },60000);





        return ()=>clearInterval(refresh);





    },[]);












    function riskColor(level:string){


        const value = level.toUpperCase();



        if(value==="HIGH"){


            return "text-red-600";


        }



        if(value==="MEDIUM"){


            return "text-yellow-600";


        }



        return "text-green-600";


    }













    return (



        <div className="space-y-8">







            {/* System Overview */}



            <section className="bg-white rounded-2xl shadow-sm p-6">



                <div className="flex flex-col md:flex-row justify-between gap-4">






                    <div>


                        <h1 className="text-3xl font-bold text-gray-800">


                            SentinelAI Operations Dashboard


                        </h1>





                        <p className="text-gray-500 mt-2">


                            AI-powered environmental risk monitoring

                            and early warning system


                        </p>


                    </div>








                    <div>


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

                loading && (


                    <p className="text-gray-500">


                        Loading locations...


                    </p>


                )

                }









                {

                !loading && locations.length===0 && (


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


                    key={`${item.location}-${index}`}


                    className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"


                    >






                        <div className="font-semibold">


                            #{index+1}

                            {" "}

                            {item.location}



                        </div>









                        <div className="text-right">





                            <div

                            className={`font-bold ${riskColor(item.risk_level)}`}

                            >



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