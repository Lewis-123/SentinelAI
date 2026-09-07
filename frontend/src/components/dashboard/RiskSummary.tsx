import {
    useEffect,
    useState
} from "react";


import {
    API_URL
} from "../../config";







interface RiskLocation {


    location:string;


    risk_level:string;


    risk_score:number;


    latitude:number;


    longitude:number;


}









export default function RiskSummary(){



    const [locations,setLocations] = useState<RiskLocation[]>([]);


    const [loading,setLoading] = useState(true);


    const [error,setError] = useState("");









    async function loadLocations(){



        try{



            const token = localStorage.getItem(

                "token"

            );





            const response = await fetch(



                `${API_URL}/risk-locations`,



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


                    "Failed loading locations"


                );



            }







            setLocations(


                data.locations || []


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



        loadLocations();





        const interval = setInterval(



            loadLocations,



            60000



        );





        return ()=>clearInterval(interval);




    },[]);













    function riskStyle(level:string){



        const value = level?.toUpperCase();







        if(value==="HIGH"){


            return {


                badge:

                "bg-red-100 text-red-700",


                bar:

                "bg-red-500",


                icon:

                "🔴"


            };


        }







        if(value==="LOW"){


            return {


                badge:

                "bg-green-100 text-green-700",


                bar:

                "bg-green-500",


                icon:

                "🟢"


            };


        }







        return {


            badge:

            "bg-yellow-100 text-yellow-700",


            bar:

            "bg-yellow-500",


            icon:

            "🟡"


        };



    }















    return (




        <div className="bg-white rounded-2xl shadow-sm p-6">







            <div className="flex justify-between items-center mb-6">



                <div>



                    <h2 className="text-xl font-bold text-gray-800">


                        Highest Risk Locations


                    </h2>





                    <p className="text-sm text-gray-500">


                        Top environmental risk areas monitored by SentinelAI


                    </p>



                </div>





                <div className="text-sm text-gray-400">


                    Live


                </div>



            </div>













            {loading && (



                <p className="text-gray-500">


                    Loading risk intelligence...


                </p>



            )}









            {error && (



                <div className="bg-red-50 text-red-600 p-3 rounded-lg">


                    {error}


                </div>



            )}









            {!loading && locations.length===0 && (



                <p className="text-gray-500">


                    No analyzed locations available.


                </p>



            )}













            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">







            {


            locations.slice(0,6).map(



                (item,index)=>{



                    const style = riskStyle(

                        item.risk_level

                    );







                    return (





                    <div



                        key={

                            item.location + index

                        }



                        className="border rounded-2xl p-5 hover:shadow-lg transition bg-gray-50"




                    >







                        <div className="flex justify-between items-start">





                            <div className="flex gap-3 items-center">





                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">


                                    #{index+1}


                                </div>








                                <div>



                                    <h3 className="font-bold text-lg">


                                        {item.location}


                                    </h3>






                                    <p className="text-xs text-gray-500">


                                        Kenya monitoring zone


                                    </p>



                                </div>





                            </div>









                            <span


                            className={`px-3 py-1 rounded-full text-xs font-bold ${style.badge}`}



                            >



                                {style.icon}

                                {" "}

                                {item.risk_level}



                            </span>






                        </div>














                        <div className="mt-5 flex justify-between">





                            <span className="font-semibold text-gray-600">


                                Risk Score


                            </span>






                            <span className="font-bold text-lg">


                                {item.risk_score}/100


                            </span>






                        </div>









                        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">



                            <div



                            className={`${style.bar} h-3 rounded-full transition-all`}



                            style={{


                                width:


                                `${item.risk_score}%`



                            }}



                            >

                            </div>



                        </div>









                        <div className="mt-4 text-xs text-gray-500">



                            📍

                            {" "}

                            {item.latitude.toFixed(4)}

                            ,

                            {" "}

                            {item.longitude.toFixed(4)}



                        </div>








                    </div>




                    )



                }



            )



            }





            </div>








        </div>



    );

}