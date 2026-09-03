import {
    useState
} from "react";





interface PredictionResult {


    location:string;

    risk_level:string;

    risk_score:number;

    confidence:number | null;


    features?:{

        temperature:number;

        rainfall:number;

        humidity:number;

        population:number;

        density:number;

        poverty_rate:number;

        ndvi:number;

        rainfall_anomaly:number;

    };


}





export default function LocationAnalyzer(){



    const [location,setLocation] =

        useState("");



    const [result,setResult] =

        useState<PredictionResult | null>(null);



    const [loading,setLoading] =

        useState(false);



    const [error,setError] =

        useState("");








    async function analyzeLocation(){



        if(!location){

            setError(

                "Enter a location"

            );

            return;

        }




        setLoading(true);

        setError("");





        try{



            const token =

                localStorage.getItem(

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






            const data =

                await response.json();







            if(!response.ok){


                throw new Error(

                    data.detail ||

                    "Prediction failed"

                );


            }






            setResult(

                data

            );





        }


        catch(error:any){



            setError(

                error.message

            );


        }


        finally{


            setLoading(false);


        }


    }








    return (

        <div className="space-y-6">


            <h2 className="text-xl font-bold">

                AI Risk Analyzer

            </h2>





            <div className="flex gap-3">


                <input


                    className="border rounded p-3 flex-1"


                    placeholder="Enter location e.g Nairobi"


                    value={location}


                    onChange={e=>

                        setLocation(

                            e.target.value

                        )

                    }


                />




                <button


                    onClick={analyzeLocation}


                    className="bg-blue-600 text-white px-5 rounded"


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







            {error && (


                <div className="text-red-600">


                    {error}


                </div>


            )}







            {result && (



                <div className="bg-gray-50 rounded-xl p-6 space-y-3">


                    <h3 className="text-2xl font-bold">


                        {result.location}


                    </h3>





                    <p>


                        Risk Level:


                        {" "}


                        <b>

                            {result.risk_level}

                        </b>


                    </p>






                    <p>


                        Risk Score:


                        {" "}


                        <b>

                        {result.risk_score}/100

                        </b>


                    </p>







                    <p>


                        Confidence:


                        {" "}


                        <b>


                        {

                        result.confidence

                        ?

                        `${result.confidence}%`

                        :

                        "N/A"

                        }


                        </b>


                    </p>







                    {result.features && (



                        <div className="mt-5">


                            <h4 className="font-bold">

                                Environmental Indicators

                            </h4>



                            <p>

                                Temperature:

                                {" "}

                                {result.features.temperature}

                            </p>




                            <p>

                                Rainfall:

                                {" "}

                                {result.features.rainfall}

                            </p>




                            <p>

                                Humidity:

                                {" "}

                                {result.features.humidity}

                            </p>




                            <p>

                                NDVI:

                                {" "}

                                {result.features.ndvi}

                            </p>




                            <p>

                                Rainfall Anomaly:

                                {" "}

                                {result.features.rainfall_anomaly}

                            </p>



                        </div>


                    )}





                </div>


            )}




        </div>

    );

}