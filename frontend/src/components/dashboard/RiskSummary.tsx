import { 
    useEffect, 
    useState 
} from "react";





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

                "http://127.0.0.1:8000/risk-locations",

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



    },[]);









    function riskStyle(level:string){



        const value = level.toUpperCase();



        if(value === "HIGH"){


            return {


                badge:

                "bg-red-100 text-red-700",


                bar:

                "bg-red-500"


            };


        }




        if(value === "LOW"){


            return {


                badge:

                "bg-green-100 text-green-700",


                bar:

                "bg-green-500"


            };


        }





        return {


            badge:

            "bg-yellow-100 text-yellow-700",


            bar:

            "bg-yellow-500"


        };


    }









    return (


        <div className="bg-white rounded-2xl shadow-sm p-6">





            <div className="flex justify-between items-center mb-6">


                <div>


                    <h2 className="text-xl font-bold text-gray-800">


                        Highest Risk Locations


                    </h2>



                    <p className="text-gray-500 text-sm">


                        Top locations with highest environmental risk scores


                    </p>


                </div>



            </div>









            {loading && (


                <p className="text-gray-500">


                    Loading risk locations...


                </p>


            )}








            {error && (


                <p className="text-red-500">


                    {error}


                </p>


            )}









            {!loading && locations.length===0 && (


                <p className="text-gray-500">


                    No analyzed locations available.


                </p>


            )}









            <div className="space-y-4">





            {


            locations.slice(0,5).map(


                (item,index)=>{


                    const style = riskStyle(

                        item.risk_level

                    );




                    return (


                    <div


                        key={

                            item.location + index

                        }


                        className="border rounded-xl p-5 hover:shadow-md transition"


                    >




                        <div className="flex justify-between items-center">





                            <div className="flex items-center gap-4">



                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">


                                    {index + 1}


                                </div>





                                <div>


                                    <h3 className="font-bold text-lg">


                                        {item.location}


                                    </h3>



                                    <p className="text-sm text-gray-500">


                                        Environmental monitoring location


                                    </p>


                                </div>



                            </div>







                            <span


                            className={`px-3 py-1 rounded-full text-sm font-bold ${style.badge}`}


                            >


                                {item.risk_level}


                            </span>






                        </div>








                        <div className="mt-4 flex justify-between">


                            <span className="font-semibold">


                                Risk Score


                            </span>



                            <span className="font-bold">


                                {item.risk_score}/100


                            </span>



                        </div>







                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">


                            <div


                            className={`${style.bar} h-2 rounded-full`}


                            style={{


                                width:

                                `${item.risk_score}%`


                            }}


                            >

                            </div>


                        </div>






                        <div className="mt-3 text-xs text-gray-400">


                            Coordinates:


                            {" "}

                            {item.latitude},

                            {" "}

                            {item.longitude}


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