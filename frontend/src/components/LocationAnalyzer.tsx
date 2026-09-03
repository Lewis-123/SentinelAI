import { useState } from "react";
import axios from "axios";


interface Result {

    location:string;

    risk_level:string;

    confidence:number;

    risk_drivers:string[];

    weather:{
        temperature:number;
        humidity:number;
        weather:string;
    };

}



function LocationAnalyzer(){


    const [city,setCity] =
        useState("");



    const [result,setResult] =
        useState<Result | null>(null);



    const [loading,setLoading] =
        useState(false);




    const analyze = async()=>{


        try{


            setLoading(true);



            const response =
                await axios.get(

                    `http://127.0.0.1:8000/analyze/${city}`

                );



            setResult(
                response.data
            );


        }


        catch(error){


            console.error(error);


            alert(
                "Unable to analyze location"
            );


        }


        finally{


            setLoading(false);


        }


    };




    return (

        <div className="bg-white rounded-xl shadow p-6 mt-10">


            <h2 className="text-2xl font-bold mb-5">

                🌍 Location Risk Analysis

            </h2>




            <div className="flex gap-3">


                <input

                    className="border rounded-lg p-3 flex-1"

                    placeholder="Enter city name"

                    value={city}

                    onChange={
                        e=>setCity(e.target.value)
                    }

                />



                <button

                    onClick={analyze}

                    className="bg-blue-600 text-white px-6 rounded-lg"

                >

                    {
                        loading
                        ?
                        "Analyzing..."
                        :
                        "Analyze"
                    }


                </button>


            </div>




            {
                result &&


                <div className="mt-8 border rounded-xl p-5">


                    <h3 className="text-xl font-bold">

                        {result.location}

                    </h3>




                    <p className="mt-3">

                        Weather:

                        {" "}

                        {result.weather.temperature}°C

                    </p>



                    <p>

                        Humidity:

                        {" "}

                        {result.weather.humidity}%

                    </p>




                    <p className="mt-4 text-3xl font-bold">

                        {result.risk_level}

                    </p>



                    <p>

                        Confidence:

                        {" "}

                        {result.confidence}%

                    </p>




                    <h4 className="font-semibold mt-5">

                        Main Risk Drivers

                    </h4>



                    <ul className="list-disc ml-6">

                        {
                            result.risk_drivers.map(

                                (driver,index)=>(

                                    <li key={index}>

                                        {driver}

                                    </li>

                                )

                            )
                        }

                    </ul>



                </div>

            }


        </div>

    )

}


export default LocationAnalyzer;