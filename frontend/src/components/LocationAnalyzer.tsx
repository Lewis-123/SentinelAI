import {
    useEffect,
    useState
} from "react";





interface LocationItem {


    name:string;

    county:string;

    latitude:number;

    longitude:number;


}








export default function LocationAnalyzer(){



    const [locations,setLocations] = useState<LocationItem[]>([]);


    const [location,setLocation] = useState("");


    const [suggestions,setSuggestions] = useState<LocationItem[]>([]);


    const [result,setResult] = useState<any>(null);


    const [loading,setLoading] = useState(false);


    const [error,setError] = useState("");









    useEffect(()=>{


        async function loadLocations(){


            try{


                const token = localStorage.getItem(

                    "token"

                );



                const response = await fetch(

                    "http://127.0.0.1:8000/locations",

                    {

                        headers:{

                            Authorization:

                            `Bearer ${token}`

                        }

                    }

                );





                const data = await response.json();





                setLocations(

                    data.locations || []

                );



            }

            catch(error){


                console.log(

                    error

                );


            }



        }



        loadLocations();



    },[]);









    function handleChange(value:string){



        setLocation(value);





        if(!value){


            setSuggestions([]);


            return;


        }







        const matches = locations.filter(

            item =>


                item.name

                .toLowerCase()

                .includes(

                    value.toLowerCase()

                )

        );




        setSuggestions(

            matches.slice(0,8)

        );


    }









    function selectLocation(item:LocationItem){


        setLocation(

            item.name

        );


        setSuggestions([]);


    }









    async function analyzeLocation(){



        if(!location){

            return;

        }






        setLoading(true);

        setError("");

        setResult(null);






        try{



            const token = localStorage.getItem(

                "token"

            );



            const response = await fetch(

                `http://127.0.0.1:8000/analyze/${location}`,

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

                    "Analysis failed"

                );


            }







            setResult(data);



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









    function riskStyle(level:string){



        if(level==="HIGH"){


            return "bg-red-100 text-red-700";


        }


        if(level==="LOW"){


            return "bg-green-100 text-green-700";


        }



        return "bg-yellow-100 text-yellow-700";


    }










    return (



        <div className="bg-white rounded-2xl shadow-sm p-6">





            <h2 className="text-xl font-bold mb-2">


                AI Risk Analyzer


            </h2>





            <p className="text-gray-500 mb-5">


                Analyze environmental risk for any Kenyan location


            </p>









            <div className="relative">


                <input


                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"


                    value={location}


                    onChange={(e)=>

                        handleChange(

                            e.target.value

                        )

                    }


                    placeholder="Search Kenyan location..."

                />







                {

                suggestions.length > 0 && (


                    <div className="absolute z-10 w-full bg-white border rounded-xl mt-2 shadow">


                    {

                    suggestions.map(item=>(



                        <div


                        key={item.name}


                        onClick={()=>selectLocation(item)}


                        className="p-3 hover:bg-gray-100 cursor-pointer"


                        >



                            <strong>

                                {item.name}

                            </strong>



                            <span className="text-gray-500 text-sm ml-2">


                                {item.county}

                            </span>



                        </div>


                    ))


                    }


                    </div>


                )


                }






            </div>









            <button


                onClick={analyzeLocation}


                disabled={loading}


                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-400"


            >


                {


                loading

                ?

                "Analyzing AI Risk..."

                :

                "Analyze Location"


                }


            </button>









            {

            error && (


                <p className="text-red-500 mt-4">


                    {error}


                </p>


            )

            }









            {

            result && (



            <div className="mt-6 border rounded-xl p-5">





                <div className="flex justify-between items-center">


                    <div>


                        <h3 className="text-xl font-bold">


                            {result.location}


                        </h3>



                        <p className="text-gray-500">


                            {result.county} County


                        </p>


                    </div>






                    <span


                    className={`px-4 py-2 rounded-full font-bold ${riskStyle(result.risk_level)}`}


                    >


                        {result.risk_level}


                    </span>




                </div>









                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">





                    <div className="bg-gray-50 rounded-xl p-4">


                        <p className="text-gray-500 text-sm">

                            Risk Score

                        </p>


                        <strong className="text-xl">

                            {result.risk_score}/100

                        </strong>


                    </div>







                    <div className="bg-gray-50 rounded-xl p-4">


                        <p className="text-gray-500 text-sm">

                            Confidence

                        </p>


                        <strong className="text-xl">

                            {result.confidence}%

                        </strong>


                    </div>








                    <div className="bg-gray-50 rounded-xl p-4">


                        <p className="text-gray-500 text-sm">

                            Temperature

                        </p>


                        <strong>

                            {result.features?.temperature}°C

                        </strong>


                    </div>








                    <div className="bg-gray-50 rounded-xl p-4">


                        <p className="text-gray-500 text-sm">

                            Rainfall

                        </p>


                        <strong>

                            {result.features?.rainfall} mm

                        </strong>


                    </div>





                </div>






                <div className="mt-5 grid grid-cols-2 gap-4">



                    <div>

                        💧 Humidity:

                        {" "}

                        {result.features?.humidity}%


                    </div>




                    <div>

                        🌱 NDVI:

                        {" "}

                        {result.features?.ndvi}


                    </div>



                </div>





            </div>



            )

            }








        </div>


    );

}